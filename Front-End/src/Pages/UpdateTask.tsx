import { useEffect, useState } from "react";
import style from "../Styles/UpdateTaskStyle.module.css"
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";

function UpdateTask(){

    interface Task{
        id:number;
        title:string;
        description:string;
    }
    const [id,setId] = useState<number>(0);
    const [title,setTitle] = useState<string|undefined>("");
    const [description,setDescription] = useState<string|undefined>("");
    const [errorMensage,setErrorMensage] = useState<string>("");
    const [task,setTask] = useState<Task>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        try{
            setId(location.state.id);
        }catch(e){
            navigate("/");
        }
    },[])

    useEffect(()=>{
        getTask();
    },[id])

    async function getTask(){
        try{
            if(id != 0)
            {
            const idUsu = localStorage.getItem("session");
            const link = "http://localhost:8080/tasks/viewTask/"+idUsu+"/"+id;
            const dados = (await axios.get(link)).data;
            setTask(dados);
            }
        }catch(e:any){
            setErrorMensage(e.response.data)
     }
    }

     useEffect(()=>{
        if(localStorage.getItem("session") == null){
            navigate("/");
        }
     },[navigate]);

     useEffect(()=>{
        setTitle(task?.title)
        setDescription(task?.description)
     },[task])

    async function update(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
        const mytask = {
            id,
            title,
            description
        }
        await axios.put("http://localhost:8080/tasks/update",mytask)
        navigate("/minhasTarefas");
        }catch(e:any){
            setErrorMensage(e.response.data);
        }
    }
    return (
        <>
            <div id={style.UpdateTaskContainer}>
                <div id={style.ImageContainer}>
                    <h1>Lista de tarefas</h1>
                </div>
                <div id={style.TaskForm}>
                    <h2>atualizando tarefa</h2>
                    <form onSubmit={update}>
                        <input type="text" placeholder="Digite o titulo" name="title" value={title}
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}></input>
                        <textarea name="description" placeholder="Digite a descrição" value={description}
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}></textarea>
                        <button type="submit">Atualizar</button>
                    </form>
                    <h3 className={style.error}>{errorMensage}</h3>
                </div>
            </div>
        </>
    )
}

export default UpdateTask;