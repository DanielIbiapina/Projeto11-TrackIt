import { useContext, useState } from "react";
import styled from "styled-components";
import lixeiro from "../Assets/Vector (2).png";
import checkk from "../Assets/checkicon.png";
import Contexto from "../Contexto";
import axios from "axios";

export default function HabitoHoje({
  habitoHoje,
  marcado,
  setMarcado,
  numeroTotalHabitos,
  att,
  setAtt,
}) {
  const { loginData, setPercentage, percentage } = useContext(Contexto);
  const config = {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  function checkHabito(dadosHabitoHoje) {
    console.log(dadosHabitoHoje.id);
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${dadosHabitoHoje.id}/check`,
      {},
      config
    );

    promise.then(() => {
      const novoArray = [...marcado, dadosHabitoHoje.id];
      setMarcado(novoArray);
      setPercentage((marcado.length / numeroTotalHabitos) * 100);
      setAtt(!att);
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });
  }

  function removeCheckHabito(dadosHabitoHoje) {
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${dadosHabitoHoje.id}/uncheck`,
      {},
      config
    );

    promise.then(() => {
      const novoArray = marcado.filter(
        (HabitoHojeId) => HabitoHojeId !== dadosHabitoHoje.id
      );
      setMarcado(novoArray);
      setPercentage((marcado.length / numeroTotalHabitos) * 100);
      setAtt(!att);
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });
  }

  function checkOrUncheckHabito(dadosHabitoHoje) {
    if (att === "historico") return;
    if (!dadosHabitoHoje.done) {
      console.log("checando");
      checkHabito(dadosHabitoHoje);
    } else {
      console.log("deschecando");
      removeCheckHabito(dadosHabitoHoje);
    }
  }

  return (
    <HabitoHojeContainer>
      <div>
        <h2>{habitoHoje.name}</h2>
        {att !== "historico" ? (
          <h1>
            Sequência atual: {habitoHoje.currentSequence} dias <br />
            Seu recorde: {habitoHoje.highestSequence} dias
          </h1>
        ) : (
          ""
        )}
      </div>
      <CheckContainer
        cor={habitoHoje.done ? "#8FC549" : "#E7E7E7"}
        onClick={() => checkOrUncheckHabito(habitoHoje)}
      >
        <img src={checkk} />
      </CheckContainer>
    </HabitoHojeContainer>
  );
}

const HabitoHojeContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;

  height: 94px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  h2 {
    margin-top: 0px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 5px;
  }
  h1 {
    margin-top: 0px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
  }
`;
const CheckContainer = styled.div`
  width: 69px;
  height: 69px;
  background: ${(props) => props.cor};

  border: 1px solid #e7e7e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 35px;
    height: 28px;
  }
`;
