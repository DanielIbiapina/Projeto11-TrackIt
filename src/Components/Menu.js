import Contexto from "../Contexto";
import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Menu() {
  const { loginData, setPercentage, percentage } = useContext(Contexto);
  return (
    <MenuContainer>
      <Link to={"/habitos"}>
        <h1>Hábitos</h1>
      </Link>
      <Link to={"/hoje"}>
        <HojeContainer>
          <CircularProgressbar
            value={percentage}
            text={`Hoje`}
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: `#FFFFFF`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Customize transition animation
                transition: "stroke-dashoffset 0.5s ease 0s",
                // Rotate the path
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: "#52B6FF",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              },
              // Customize the text
              text: {
                // Text color
                fill: "#FFFFFF",
                // Text size
                fontSize: "50px",
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: "#FFFFFF",
              },
            }}
          />
        </HojeContainer>
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
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 450px;

  h1 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52b6ff;
  }
  h2 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    background-color: #52b6ff;
    color: #ffffff;
  }
`;
const HojeContainer = styled.div`
  width: 50px;
  background-color: blue;
`;
