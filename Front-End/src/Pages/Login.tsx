import { useEffect, useState } from "react";
import style from "../Styles/LoginStyle.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login(){

 
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [errorMensage,setErrorMensage] = useState<string>("");
    const navigate = useNavigate();

     useEffect(()=>{
        if(localStorage.getItem("session") != null){
            navigate("/");
        }
     },[navigate]);

    const checkLogin = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const data = {
            email,
            password
        };
        axios.post("http://localhost:8080/users/login",data).then(response =>{
            if(response.data){
                axios.get("http://localhost:8080/users/getId/"+email).then(response=>{
                    const id:number = response.data;
                    localStorage.setItem('session',id.toString());
                    navigate('/');
                })
            }else{
                setErrorMensage("Usuario não encontrado")
            }
        })
    }

    return (
        <>
            <div id={style.LoginUserContainer}>
                <div id={style.ImageContainer}>
                    <h1>Lista de tarefas</h1>
                </div>
                <div id={style.LoginForm}>
                    <h2>Bem vindo ao TODOLIST</h2>
                    <form onSubmit={checkLogin}>
                        <input type="email" placeholder="Digite o seu usuario" name="email" value={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }}></input>
                        <input type="password" placeholder="Digite sua senha" name="password" value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}></input>
                        <button type="submit">Login</button>
                    </form>
                    <h3 className={style.error}>{errorMensage}</h3>
                    <div className={style.linkdiv}>
                        <Link to="/cadastro" id={style.register}>Não tem uma conta? Registra-se.</Link>
                        <Link to="/recuperar" id={style.forget}>Esqueci minha senha.</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;