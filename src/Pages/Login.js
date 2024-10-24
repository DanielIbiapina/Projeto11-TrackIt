import logo from "../Assets/Group-8.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import { Oval } from "react-loader-spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoginData } = useContext(Contexto);

  function fazerLogin(event) {
    event.preventDefault();
    setLoading(true);
    const requisicao = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      {
        email: email,
        password: senha,
      }
    );

    requisicao.then((resposta) => {
      setLoading(false);
      setLoginData(resposta.data);
      navigate("/hoje");
    });

    requisicao.catch((erro) => {
      console.log(erro.response.data);
      setLoading(false);
    });
  }

  return (
    <BodyLogin>
      <Logo src={logo}></Logo>

      <Form onSubmit={fazerLogin}>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {loading ? (
          <BotaoEntrar type="submit" disabled="true">
            <Oval
              height={40}
              width={40}
              color="#FFFFFF"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </BotaoEntrar>
        ) : (
          <BotaoEntrar type="submit">Entrar</BotaoEntrar>
        )}
      </Form>

      <Link to={"/cadastro"}>
        <BotaoNaoTenhoConta>Não tem uma conta? Cadastre-se!</BotaoNaoTenhoConta>
      </Link>
    </BodyLogin>
  );
}

const BodyLogin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 100vmax;
`;
const Logo = styled.img`
  margin-top: 68px;
  width: 180px;
`;
const BotaoEntrar = styled.button`
  width: 303px;
  height: 45px;
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
`;
const BotaoNaoTenhoConta = styled.div`
  width: 232px;
  height: 17px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration-line: underline;
  color: #52b6ff;
  margin-top: 25px;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 303px;
  height: 45px;
  margin-bottom: 6px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 33px;
`;
