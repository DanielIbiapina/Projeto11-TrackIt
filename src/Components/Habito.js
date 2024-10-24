import { useContext } from "react";
import styled from "styled-components";
import lixeiro from "../Assets/Vector (2).png";
import Contexto from "../Contexto";
import axios from "axios";

export default function Habito({ habito, att, setAtt, diasDaSemana }) {
  console.log(habito);
  const { loginData } = useContext(Contexto);

  const config = {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  function deletarHabito() {
    const confirm = window.confirm("deseja deletar?");
    if (confirm == false) {
      return;
    }
    if (confirm == true) {
      console.log(habito.id);
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`,
        config
      );
      setAtt(!att);
    }
  }

  return (
    <HabitoContainer>
      <span>
        <p>{habito.name}</p>
        <img src={lixeiro} onClick={() => deletarHabito()} />
      </span>
      <DiasContainer>
        {diasDaSemana.map((dia) => (
          <Dia key={dia.id} selecionado={habito.days.includes(dia.id)}>
            {dia.nome}
          </Dia>
        ))}
      </DiasContainer>
    </HabitoContainer>
  );
}

const HabitoContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 340px;
  height: 91px;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;

  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
  }
  img {
    width: 13px;
    height: 15px;
  }
  span {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;

const DiasContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Dia = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.selecionado ? "#cfc" : "#eee")};
  color: ${(props) => (props.selecionado ? "#fff" : "#000")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selecionado ? "#9c9" : "#ddd")};
  }
`;
