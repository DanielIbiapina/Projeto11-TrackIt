import Contexto from "../Contexto";
import { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Menu() {
  const { percentage } = useContext(Contexto);
  const navigate = useNavigate();

  return (
    <MenuContainer>
      <h1 onClick={() => navigate("/habitos")}>Hábitos</h1>

      <Link to={"/hoje"}>
        <HojeContainer>
          <CircularProgressbar
            value={Math.round(percentage)}
            text="Hoje"
            styles={buildStyles({
              pathColor: "#FFFFFF",
              trailColor: "#52B6FF",
              textColor: "#FFFFFF",
              textSize: "20px",
              strokeLinecap: "round",
              backgroundColor: "#52B6FF",
            })}
          />
        </HojeContainer>
      </Link>

      <h1 onClick={() => navigate("/historico")}>Histórico</h1>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 450px;
  padding: 0 10px;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #52b6ff;
    cursor: pointer;
    text-align: center;
  }
`;

const HojeContainer = styled.div`
  width: 91px;
  height: 91px;
  border-radius: 50%;
  background-color: #52b6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -28px; /* Posiciona acima da borda do menu */
  transform: translate(-50%);
  font-family: "Lexend Deca", sans-serif;
`;
