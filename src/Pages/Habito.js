import { useContext } from "react";
import styled from "styled-components";
import lixeiro from "../Assets/Vector (2).png"
import Contexto from "../Contexto"
import axios from "axios";


export default function Habito({ habito, att, setAtt }) {
    console.log(habito)
    const {loginData} = useContext(Contexto)

    const config = {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      };

    function deletarHabito() {
        const confirm = window.confirm('deseja deletar?')
        if(confirm == false){
            return
        }
        if(confirm == true){
        console.log(habito.id)
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`, config)
        setAtt(!att)
        }
    }

    return (
        <HabitoContainer>
            <p>{habito.name}</p>
            <img src = {lixeiro} onClick = {()=> deletarHabito()}/>
        </HabitoContainer>
    );
}

const HabitoContainer = styled.div`
box-sizing: border-box;
padding: 10px;
width: 340px;
height: 91px;
background: #FFFFFF;
border-radius: 5px;
margin-bottom: 10px;
display: flex;
justify-content: space-between;
p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
}
img{
    width: 13px;
    height: 15px;
}
`