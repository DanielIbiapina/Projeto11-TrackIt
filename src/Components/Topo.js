import Contexto from "../Contexto";
import { useContext } from "react";
import styled from "styled-components";

export default function Topo() {
  const { loginData, setPercentage, percentage } = useContext(Contexto);

  return (
    <TopoContainer>
      <p>TrackIt</p>
      <ImagemPerfil src={loginData.image}></ImagemPerfil>
    </TopoContainer>
  );
}

const TopoContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  max-width: 450px;
  margin: auto;
  p {
    position: relative;
    top: 0;
    font-family: "Playball";
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    color: #ffffff;
    margin-left: 18px;
  }
`;
const ImagemPerfil = styled.img`
  width: 51px;
  margin-right: 18px;
  position: relative;
  border-radius: 98.5px;
`;
