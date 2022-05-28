import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { addAsistance } from "./db/controller";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ReaderContainer = styled.div`
  width: 30%;
  border: 2px solid #111;
  padding: 0 10px;
  padding-bottom: 40px;
  text-align: center;
  box-shadow: 2px 2px 5px 3px #3333;
  p {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: 30px;
    text-align: center;
    text-shadow: 1px 1px 1px #f4f4;
  }
  section div {
    display: ${(props) => (props.loading ? "none" : "block")};
  }
`;
let id;
const App = (props) => {
  const [loading, setLoading] = useState(false);
  const handleScan = async (result) => {
    if (result && result?.text !== id) {
      setLoading(true);
      id = result.text;
      addAsistance(result?.text).then((user) => {
        if (user.error) return toast.error(user.error);
        if (user.warning) return toast(`Usuario ya presente`, { icon: "👍" });
        toast.success(`${user.name} ${user.surname} presente`);
      });
      setLoading(false);
    }
  };
  return (
    <AppContainer>
      <Toaster />
      <ReaderContainer loading={loading}>
        <p>Registre su Asistencia</p>
        <QrReader onResult={handleScan} />
        <img
          src="https://i.pinimg.com/originals/1e/d5/47/1ed547006742581be6daece42fb2fd34.gif"
          style={{ display: !loading && "none", width: 320, height: 240 }}
          alt="Procesando..."
        />
      </ReaderContainer>
    </AppContainer>
  );
};

export default App;
