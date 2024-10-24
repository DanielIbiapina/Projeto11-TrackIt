import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import Topo from "../Components/Topo";
import Menu from "../Components/Menu";
import Habito from "../Components/Habito";

export default function Habitos() {
  const { loginData, setPercentage, percentage } = useContext(Contexto);
  const [add, setAdd] = useState(false);
  const [textohabito, setTextohabito] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [habitDisplay, setHabitDisplay] = useState(false);
  const [habitos, setHabitos] = useState(null);
  const [att, setAtt] = useState(false);
  const navigate = useNavigate();

  const diasDaSemana = [
    { id: 0, nome: "D" }, // Domingo
    { id: 1, nome: "S" }, // Segunda
    { id: 2, nome: "T" }, // Terça
    { id: 3, nome: "Q" }, // Quarta
    { id: 4, nome: "Q" }, // Quinta
    { id: 5, nome: "S" }, // Sexta
    { id: 6, nome: "S" }, // Sábado
  ];

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
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((resposta) => {
      setHabitos(resposta.data);
      setAdd(false);
      if (resposta.data.length != 0) {
        setHabitDisplay(true);
      }
      if (resposta.data.length == 0) {
        setHabitDisplay(false);
      }
    });
  }, [att]);

  function salvarHabito(event) {
    event.preventDefault();

    const requisicao = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        name: textohabito,
        days: diasSelecionados,
      },
      config
    );
    console.log(loginData);

    requisicao.then((resposta) => {
      console.log(resposta.data);
      setAtt(!att);
    });

    requisicao.catch((err) => {
      console.log(err.response.data);
    });
  }

  function toggleDia(id) {
    if (diasSelecionados.includes(id)) {
      setDiasSelecionados(diasSelecionados.filter((dia) => dia !== id));
    } else {
      setDiasSelecionados([...diasSelecionados, id]);
    }
  }

  if (habitos === null) {
    return "carregando...";
  }

  return (
    <AppContainer>
      <Topo />
      <BodyApp>
        <AddContainer>
          <p>Meus hábitos</p>
          <BotaoAdd onClick={() => setAdd(!add)}> + </BotaoAdd>
        </AddContainer>
        {add ? (
          <HabitoRascunho>
            <Form onSubmit={salvarHabito}>
              <Input
                type="text"
                placeholder="nome do hábito"
                value={textohabito}
                onChange={(e) => setTextohabito(e.target.value)}
              />
              <DiasContainer>
                {diasDaSemana.map((dia) => (
                  <Dia
                    key={dia.id}
                    selecionado={diasSelecionados.includes(dia.id)}
                    onClick={() => toggleDia(dia.id)}
                  >
                    {dia.nome}
                  </Dia>
                ))}
              </DiasContainer>
              <Botoes>
                <BotaoCancelar type="button" onClick={() => setAdd(!add)}>
                  Cancelar
                </BotaoCancelar>
                <BotaoSalvar type="submit">Salvar</BotaoSalvar>
              </Botoes>
            </Form>
          </HabitoRascunho>
        ) : (
          ""
        )}
        {habitDisplay ? (
          habitos.map((habito, index) => {
            return (
              <Habito
                habito={habito}
                key={index}
                att={att}
                setAtt={setAtt}
                diasDaSemana={diasDaSemana}
              />
            );
          })
        ) : (
          <h1>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </h1>
        )}
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

  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  h1 {
    margin-top: 28px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`;

const DiasContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 100%;
  margin-bottom: 15px;
`;

const Dia = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.selecionado ? "#cfcfcf" : "#ffffff")};
  color: ${(props) => (props.selecionado ? "#fff" : "#cfcfcf")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  cursor: pointer;
  transition: background-color 0.3s;
  border: solid #cfcfcf 2px;
  margin-right: 5px;
  font-family: "Lexend Deca";
  font-size: 20px;

  &:hover {
    background-color: ${(props) => (props.selecionado ? "#9c9" : "#ddd")};
  }
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 95px;
  margin-bottom: 20px;
`;
const BotaoAdd = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 35px;
  background: #52b6ff;
  border-radius: 4.63636px;
  border: 0;

  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 26.976px;
  line-height: 34px;
  color: #ffffff;
`;
const HabitoRascunho = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 40px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 33px;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  margin-bottom: 6px;
  background: #ffffff;

  border: 2px solid #cfcfcf;
  border-radius: 5px;
  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #cfcfcf;
  }
`;

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 18px;
  border-radius: 5px;
`;

const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0px;
`;
const BotaoSalvar = styled.button`
  width: 84px;
  height: 35px;
  background: #52b6ff;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 20.976px;
  line-height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-left: 10px;
  border: 0;
`;
const BotaoCancelar = styled.div`
  width: 84px;
  height: 35px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 20.976px;
  line-height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #52b6ff;
`;
