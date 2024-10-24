import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import Topo from "../Components/Topo";
import Menu from "../Components/Menu";

export default function Historico() {
  const { loginData, setPercentage, percentage } = useContext(Contexto);
  const navigate = useNavigate();

  return (
    <>
      <Topo />
      <BodyApp>
        <p>Histórico</p>
        <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
      </BodyApp>
      <Menu />
    </>
  );
}

const BodyApp = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  height: 100%;
  margin-left: 17px;
  margin-right: 17px;

  p {
    margin-top: 98px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  h1 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #bababa;
  }
`;
