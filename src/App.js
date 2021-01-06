import React from "react";
import "./Style.js";

import Home from "./components/Home/Home";
import { ContainerGeral } from "./Style";

function App() {
  return (
    <ContainerGeral>
      <Home />
    </ContainerGeral>
  );
}

export default App;
