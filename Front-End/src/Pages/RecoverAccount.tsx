import { useEffect, useState } from "react";
import style from "../Styles/RecoverStyle.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Recover(){

 
    const [email,setEmail] = useState<string>("");
    const [screen,setScreen] = useState<number>(1);
    const [code,setCode] = useState<string>("")
    const [verifyCode,setVerifyCode] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [errorMensage,setErrorMensage] = useState<string>("");
    const navigate = useNavigate();
    const letras:string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

     useEffect(()=>{
        if(localStorage.getItem("session") != null){
            navigate("/");
        }
     },[navigate]);

    const sendEmail = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const subject:string = "Recuperação de conta"
        let tempCode:string = "";
        for(let i=0;i<=7;i++){
            let numOrChar:number = Math.floor(Math.random() * 2);
            if(numOrChar == 0){
                tempCode += letras[Math.floor(Math.random() * 26)]
            }else{
                tempCode += Math.floor(Math.random()*10).toString();
            }
        }
        setCode(tempCode);
        const message:string = "Seu código de recuperação da conta é:"+tempCode;
        const data = {
            userTo:email,
            subject,
            messenge:message
        };
        console.log(data)
        axios.post("http://localhost:8080/users/email",data);
        setScreen(2);
    }

    const checkCode = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(code==verifyCode){
            setScreen(3);
        }else{
            setErrorMensage("Codigo incorreto ou expirado,por favor tente novamente");
        }
    }

    const updatePassword = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const data = {
            email,
            password
        }
        try
        {
         await axios.put("http://localhost:8080/users/update",data)
         navigate("/")
        }catch(e:any){
            setErrorMensage(e.response.data);
        }
    }
    useEffect(()=>{
        if(code != "")
        {
        setTimeout(()=>{
            setCode("");
        },180000)
    }
    },[code])
    const screen1 = ()=>
    {
        return(
        <div id={style.RecoverForm}>
        <h2>Bem vindo ao TODOLIST</h2>
        <form onSubmit={sendEmail}>
            <input type="email" placeholder="Digite o seu email" name="email" value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }}></input>
            <button type="submit">Enviar Email</button>
        </form>
        </div>
        )
    }

    const screen2 = ()=>
        {
            return(
            <div id={style.RecoverForm}>
            <h2>Bem vindo ao TODOLIST</h2>
            <form onSubmit={checkCode}>
                <input type="text" placeholder="Digite o seu codigo" name="code" value={verifyCode} onChange={(e)=>{
                    setVerifyCode(e.target.value)
                }}></input>
                <button type="submit">Enviar codigo</button>
            </form>
            <h3 className={style.error}>{errorMensage}</h3>
            </div>
            )
        }

        const screen3 = ()=>
            {
                return(
                <div id={style.RecoverForm}>
                <h2>Bem vindo ao TODOLIST</h2>
                <form onSubmit={updatePassword}>
                    <input type="password" placeholder="Digite a sua senha" name="password" value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></input>
                    <button type="submit">Enviar codigo</button>
                </form>
                <h3 className={style.error}>{errorMensage}</h3>
                </div>
                )
            }
    
    const myScreen = ()=>{
        switch(screen){
            case 1:
                return screen1();
            case 2:
                return screen2();
            case 3:
                return screen3();
        }

    }
    return (
        <>
            <div id={style.RecoverUserContainer}>
                <div id={style.ImageContainer}>
                    <h1>Lista de tarefas</h1>
                </div>
                {myScreen()}
            </div>
        </>
    )
}


export default Recover;