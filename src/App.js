import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import Hoje from "./Pages/Hoje";
import Historico from "./Pages/Historico";
import Habitos from "./Pages/Habitos";
import Contexto from "./Contexto";
import { useState } from "react";

export default function App() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [percentage, setPercentage] = useState(0);
  const [createCardData, setCreateCardData] = useState({
    name: "",

    days: "",
  });

  return (
    <Contexto.Provider
      value={{
        loginData,
        setLoginData,
        percentage,
        setPercentage,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hoje" element={<Hoje />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/habitos" element={<Habitos />} />
        </Routes>
      </BrowserRouter>
    </Contexto.Provider>
  );
}
