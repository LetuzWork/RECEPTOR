import { db } from "../db/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

const getUser = async (id) => {
  const snap = await getDoc(doc(db, "users", id));
  return snap.exists()
    ? { id: snap.id, ...snap.data() }
    : { error: "El Usuario no existe" };
};

const addAsistance = async (id) => {
  try {
    const day = new Date().toISOString().substring(0, 10);
    const time = new Date().toTimeString().substring(0, 5);

    // console.log(day, time);
    const assistanceRef = doc(db, "assistances", day);

    const user = await getUser(id);
    if (user.error) return user;

    await getDoc(assistanceRef).then(async (snap) => {
      if (snap.exists()) {
        console.log(snap.data().content.find((x) => x.user === id));
        if (snap.data().content.find((x) => x.user === id)) {
          user.warning = true;
          return;
        }
        await updateDoc(assistanceRef, {
          content: arrayUnion({ user: id, time }),
        });
      } else {
        await setDoc(assistanceRef, {
          content: [{ user: id, time }],
        });
      }
      const userRef = doc(db, "users", id);

      await updateDoc(userRef, {
        asisted: increment(1),
      });
    });
    return user;
  } catch (e) {
    console.log(e);
  }
};

export { getUser, addAsistance };
