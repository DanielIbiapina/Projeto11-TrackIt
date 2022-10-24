import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto"
import Topo from "./Topo";
import Menu from "./Menu";
import dayjs from "dayjs";
import HabitoHoje from "./HabitoHoje";
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
    console.log(loginData)
    const navigate = useNavigate()
    const [habitosHoje, setHabitosHoje] = useState(null)
    const todayTitle = dayjs().format("dddd[,] DD/MM");
    const [marcado, setMarcado] = useState([])
    
    

    const config = {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      };
      
      useEffect(() => {
        if (loginData.token === undefined) {
            navigate("/");
          }
      const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
      promise.then(respost => {
          alert('habitoHoje resgatado')
          console.log(respost.data)
          setHabitosHoje(respost.data)
          
      });
      promise.catch(err => {
        alert('err')
        console.log(err.response.data);
    });

  }, []);
    
  if (habitosHoje === null) {
    return 'carregando...';
}


    return (
        <>
            <Topo />
            <BodyApp>
                <p>{todayTitle}</p>
                <h1>Nenhum hábito concluído ainda</h1>
                {
                habitosHoje.map((habitoHoje, index) => {
                        return (
    
                            <HabitoHoje habitoHoje={habitoHoje} key={index} marcado = {marcado} setMarcado = {setMarcado} />
                        )
                    }
                    )
                }
            </BodyApp>
            <Menu />
        </>
    );
}


const BodyApp = styled.div`
margin-top: 70px;
margin-bottom: 70px;
height: 100%;
margin-left: 17px;
margin-right: 17px;

p{
    margin-top: 98px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
}
h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;

}
`


