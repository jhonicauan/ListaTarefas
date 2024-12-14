import { useEffect, useState } from "react";
import style from "../Styles/ViewTaskStyle.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewTask(){

    interface Task{
        title:string;
        description:string;
        completedAt:string;
    }
    const location= useLocation();
    const navigate = useNavigate();
    const [id,setId] = useState<number>(0);
    const [task,setTask] = useState<Task>();

    useEffect(()=>{
        if(localStorage.getItem("session") == null){
            navigate("/");
        }
     },[navigate]);
     
    async function getTask(){
        if(id != 0)
        {
        const idUsu = localStorage.getItem("session");
        const link = "http://localhost:8080/tasks/viewTask/"+idUsu+"/"+id;
        console.log(link);
        const dados = (await axios.get(link)).data;
        setTask(dados);
        }
    }
    useEffect(()=>{
    try{
        setId(location.state.id);
    }catch(e){
        navigate("/")
    }
    },[])

    useEffect(()=>{
        getTask();
    },[id])

    async function completeTask(){
        const newData = (await axios.put("http://localhost:8080/tasks/complete/"+id)).data;
        setTask(newData);
    }

    async function restartTask(){
        const newData = (await axios.put("http://localhost:8080/tasks/restart/"+id)).data;
        setTask(newData);
    }

    function statusButton(){
        if(task?.completedAt == null){
            return (
            <>
            <button className={style.update} onClick={()=>{navigate("/atualizarTarefa",{state:{id:id}});}}>Atualizar</button>
            <button className={style.complete} onClick={()=>{completeTask();}}>finalizar tarefa</button>
            </>
            )
        }else{
            return <button className={style.restart} onClick={()=>{
                restartTask();
            }}>reativar tarefa</button>
        }
    }
    return <div className={style.taskContainer}>
        <div className={style.title}>
            <Link to="/minhasTarefas">Voltar</Link>
            {task?.title}
        </div>
        <div className={style.content}>
            {task?.description}
        </div>
        <div className={style.footer}>
           {statusButton()}
        </div>
    </div>
}

export default ViewTask;