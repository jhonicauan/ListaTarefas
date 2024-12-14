import axios from "axios";
import  style from "../Styles/MyTasksStyle.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyTasks(){

    interface Task{
        id:number;
        title:string;
        createdAt:string;
    }

    const navigate = useNavigate();
    const [task,setTask] = useState<Task[]>([]);

    async function getDivs(){
        const id = localStorage.getItem("session");
        const link = "http://localhost:8080/tasks/viewAllTasks/"+id;
        const dados = await axios.get(link);
        const mytask = dados.data;
        setTask(mytask);
    }

    useEffect(()=>{
         getDivs();
    },[])

    function goToTask(id:number):void{
        navigate("/tarefa",{state:{id:id}})
    }
    const createDivs = ()=>{
        console.log(task);
        return task.map((items)=>{
           return  <div key={items.id} className={style.taskContainer} onClick={()=>{
            goToTask(items.id)
           }}>
            <div>
                {items.title}
            </div>
            <div className={style.clock}>
                <img src="/Icons/clock.png" alt="Relogio" />
                {items.createdAt}
            </div>
        </div>
        })
    }

    if(task.length != 0 )
    {
        return(
            <>
                <div className={style.mytasks}>
                    {createDivs()}
                </div>
            </>
        )
    }else{
    return <h1>Sem dados</h1>
    }
}

export default MyTasks;