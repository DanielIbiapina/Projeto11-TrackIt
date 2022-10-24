import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto"
import Topo from "./Topo";
import Menu from "./Menu";
import { Oval } from 'react-loader-spinner'
import Habito from "./Habito";


export default function Habitos() {
    const { loginData, setPercentage, percentage } = useContext(Contexto);
    const [add, setAdd] = useState(false)
    const [textohabito, setTextohabito] = useState('')
    const [loading, setLoading] = useState(false)
    const [habitDisplay, setHabitDisplay] =useState(false)
    const [habitos, setHabitos] = useState(null)
    const [att, setAtt] = useState(false)
    const navigate = useNavigate()

    
    
        const config = {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        };
        
        useEffect(() => {
            if (loginData.token === undefined) {
                navigate("/");
              }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then(respost => {
            alert('habito resgatado')
            console.log(respost.data)
            setHabitos(respost.data)
            setAdd(false)
            if(respost.data.length != 0){
                setHabitDisplay(true)
            }
            if(respost.data.length == 0){
                setHabitDisplay(false)
            }
            
        });
    }, [att]);


    
    function salvarHabito(event) {
        event.preventDefault();
        console.log(textohabito)
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            name: textohabito,
            days: [1, 3, 5] // segunda, quarta e sexta
        }, config)
        console.log(loginData)
        alert('oi')
        requisicao.then(respost => {
            alert('habito criado')
            console.log(respost.data)
            setAtt(!att)
        
        });

        requisicao.catch(err => {
            alert('err')
            console.log(err.response.data);
        });
    }

    
    

    return (
        <>
            <Topo />
            <BodyApp>
                <AddContainer>
                    <p>Meus hábitos</p>
                    <BotaoAdd onClick={() => setAdd(!add)}> + </BotaoAdd>
                </AddContainer>
                {
                    add
                        ?
                        <HabitoRascunho>
                            <Form onSubmit={salvarHabito}>
                                <Input type="text" placeholder=" nome do hábito" value={textohabito} onChange={e => setTextohabito(e.target.value)} />
                                <BotaoCancelar type="submit">cancelar</BotaoCancelar>
                                <BotaoSalvar type="submit">Salvar</BotaoSalvar>
                            </Form>

                        </HabitoRascunho>
                        :
                        ''
                }
                {
                    habitDisplay
                    ?
                    habitos.map((habito, index) => {
                        return (
    
                            <Habito habito={habito} key={index} att = {att} setAtt = {setAtt} />
                        )
                    }
                    )
                    :
                    <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>
                }

                
            </BodyApp>
            <Menu />
        </>
    );
}


const BodyApp = styled.div`
margin-top: 70px;
margin-bottom: 70px;
height: 100vmax;
margin-left: 17px;
margin-right: 17px;

p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
}
h1{
    margin-top: 28px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;

}
`
const AddContainer = styled.div`
display:  flex;
justify-content: space-between;
align-items: center;
margin-top: 95px;
margin-bottom: 20px;
`
const BotaoAdd = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 40px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 26.976px;
line-height: 34px;
color: #FFFFFF;
`
const HabitoRascunho = styled.div`
width: 340px;
height: 180px;
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
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 33px;
background-color: #FFFFFF;
padding: 18px;
border-radius: 5px;
`

const BotaoSalvar = styled.button`
width: 84px;
height: 35px;
background: #52B6FF;
box-sizing: border-box;
border-radius: 5px;
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
const BotaoCancelar = styled.div`
width: 84px;
height: 35px;
background: #FFFFFF;
box-sizing: border-box;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
display: flex;
justify-content: center;
align-items: center;
color: #52B6FF;
`