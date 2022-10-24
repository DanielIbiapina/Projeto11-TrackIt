import logo from "../Assets/Group-8.png"
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate()

    function fazerLogin(event) {
        event.preventDefault(); 

        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
            email: email,
            name: nome,
            image: foto,
            password: senha
        })

        
        requisicao.then(() => navigate("/"))

    }

    return (
        <BodyCadastro>

            <Logo src={logo}>
            </Logo>

            <Form onSubmit={fazerLogin}>
                <Input type="email" placeholder=" email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder=" senha" value={senha} onChange={e => setSenha(e.target.value)} />
                <Input type="text" placeholder=" nome" value={nome} onChange={e => setNome(e.target.value)} />
                <Input type="url" placeholder=" foto" value={foto} onChange={e => setFoto(e.target.value)} />
                <BotaoCadastrar type="submit">Cadastrar</BotaoCadastrar>
            </Form>

            <Link to={"/"}>
                <BotaoTenhoConta>
                    Já tem uma conta? Faça login!
                </BotaoTenhoConta>
            </Link>

        </BodyCadastro>
    );
}


const BodyCadastro = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
background-color: #FFFFFF;
height: 100vmax;
`
const Logo = styled.img`
margin-top: 68px;
width: 180px;
`
const BotaoCadastrar = styled.button`
box-sizing: border-box;
width: 303px;
height: 45px;
background: #52B6FF;
border-radius: 4.63636px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
display: flex;
justify-content: center;
align-items: center;
color: #FFFFFF;
`
const BotaoTenhoConta = styled.div`
width: 232px;
height: 17px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 13.976px;
line-height: 17px;
display: flex;
justify-content: center;
align-items: center;
text-decoration-line: underline;
color: #52B6FF;
margin-top: 25px;
`
const Input = styled.input`
box-sizing: border-box;
width: 303px;
height: 45px;
margin-bottom: 6px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
::placeholder{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
}
`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 33px;
`