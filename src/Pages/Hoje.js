import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import Topo from "../Components/Topo";
import Menu from "../Components/Menu";
import dayjs from "dayjs";
import HabitoHoje from "../Components/HabitoHoje";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekdays: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
});

export default function Hoje() {
  const { loginData, setPercentage, percentage } = useContext(Contexto);
  const navigate = useNavigate();
  const [habitosHoje, setHabitosHoje] = useState(null);
  const todayTitle = dayjs().format("dddd[,] DD/MM");
  const [marcado, setMarcado] = useState([]);
  const [att, setAtt] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  useEffect(() => {
    if (loginData.token === undefined) {
      navigate("/");
    }

    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    promise
      .then((resposta) => {
        console.log(resposta.data);
        setHabitosHoje(resposta.data);

        const novosMarcados = resposta.data
          .filter((habito) => habito.done)
          .map((habito) => habito.id);

        setMarcado(novosMarcados);
        setPercentage((novosMarcados.length / resposta.data.length) * 100);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [att]);

  if (habitosHoje === null) {
    return "carregando...";
  }

  return (
    <AppContainer>
      <Topo />
      <BodyApp>
        <TitleContainer>
          <p>{todayTitle}</p>
          {marcado.length === 0 ? (
            <h1>Nenhum hábito concluído ainda</h1>
          ) : (
            <h4>{Math.round(percentage)}% dos hábitos concluídos</h4>
          )}
        </TitleContainer>
        <HabitosHojeContainer>
          {habitosHoje.map((habitoHoje, index) => {
            return (
              <HabitoHoje
                habitoHoje={habitoHoje}
                key={index}
                marcado={marcado}
                setMarcado={setMarcado}
                numeroTotalHabitos={habitosHoje.length}
                att={att}
                setAtt={setAtt}
              />
            );
          })}
        </HabitosHojeContainer>
      </BodyApp>
      <Menu />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100%;
`;

const BodyApp = styled.div`
  margin-bottom: 70px;
  height: 100vmax;
  max-width: 420px;
  width: 90%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 95px;
  margin-bottom: 30px;

  p {
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
  h4 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8fc549;
  }
`;

const HabitosHojeContainer = styled.div``;
