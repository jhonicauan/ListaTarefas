import { useEffect, useState } from "react";
import style from "../Styles/RegisterTaskStyle.module.css"
import axios from "axios";
import {  useNavigate } from "react-router-dom";

function RegisterTask(){

    const [title,setTitle] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [errorMensage,setErrorMensage] = useState<string>("");
    const navigate = useNavigate();

     useEffect(()=>{
        if(localStorage.getItem("session") == null){
            navigate("/");
        }
     },[navigate]);

    const addTask = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const idUser:number = parseInt(localStorage.getItem("session") as string);
        const data = {
            idUser,
            title,
            description
        }
        try{
            await axios.post("http://localhost:8080/tasks/add",data);
            navigate("/");
          }catch(e:any){
              setErrorMensage(e.response.data);
          }
    }
    return (
        <>
            <div id={style.RegisterTaskContainer}>
                <div id={style.ImageContainer}>
                    <h1>Lista de tarefas</h1>
                </div>
                <div id={style.TaskForm}>
                    <h2>Cadastrar tarefa</h2>
                    <form onSubmit={addTask}>
                        <input type="text" placeholder="Digite o titulo" name="title" value={title}
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}></input>
                        <textarea name="description" placeholder="Digite a descrição" value={description}
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}></textarea>
                        <button type="submit">Cadastrar</button>
                    </form>
                    <h3 className={style.error}>{errorMensage}</h3>
                </div>
            </div>
        </>
    )
}

export default RegisterTask;