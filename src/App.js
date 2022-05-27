import "./App.css";
import { QrReader } from "react-qr-reader";
// import QrReader from "react-qr-scanner";
import { useState } from "react";
import styled from "styled-components";

const ReaderContainer = styled.div`
  width: 60vw;
  height: 60vh;
`;
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [data, setData] = useState();
  return (
    <AppContainer className="App">
      <ReaderContainer>
        <QrReader
          constraints={{ facingMode: "environfdment" }}
          onResult={(result) => {
            result && setData(result.text);
          }}
        />
        <p>data:{data}</p>
      </ReaderContainer>
    </AppContainer>
  );
}

export default App;
