import Contexto from "../Contexto";
import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <MenuContainer>
            <Link to={"/habitos"}>
                <h1>Hábitos</h1>
            </Link>
            <Link to={"/hoje"}>
                <h2>Hoje</h2>
            </Link>
            <Link to={"/historico"}>
                <h1>Histórico</h1>
            </Link>
        </MenuContainer>
    );
}

const MenuContainer = styled.div`
width: 100%;
height: 70px;
position: fixed;
bottom: 0;
background-color: #FFFFFF;
display: flex;
align-items: center;
justify-content: space-around;
h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;
}
h2{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    background-color: #52B6FF;
    color: #FFFFFF;
}
`