import { useState } from "react";
import style from "../Styles/RegisterUserStyle.module.css"
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterUser(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
       if(localStorage.getItem("session") != null){
           navigate("/");
       }
    },[navigate]);

    const checkRegisterUser = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const data = {
            name,
            email,
            password
        };
        try{
          await axios.post("http://localhost:8080/users/add",data);
          navigate("/");
        }catch(e:any){
            setErrorMessage(e.response.data);
        }


    }

    return (
        <>
            <div id={style.RegisterUserContainer}>
                <div id={style.ImageContainer}>
                    <h1>Lista de tarefas</h1>
                </div>
                <div id={style.RegisterForm}>
                    <h2>Bem vindo ao TODOLIST</h2>
                    <form onSubmit={checkRegisterUser}>
                        <input type="text" placeholder="Digite o seu nome" name="name" onChange={(e)=>{
                            setName(e.target.value)
                        }}></input>
                        <input type="email" placeholder="Digite o seu email" name="email" onChange={(e)=>{
                            setEmail(e.target.value)
                        }}></input>
                        <input type="password" placeholder="Digite sua senha" name="password" onChange={(e)=>{
                            setPassword(e.target.value)
                        }}></input>
                        <button type="submit">Cadastrar</button>
                    </form>
                    <h3 className={style.error}>{errorMessage}</h3>
                    <div className={style.linkdiv}>
                        <Link to="/login" id={style.login}>Já possui uma conta? Logar-se.</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterUser;