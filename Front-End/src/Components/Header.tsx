import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/HeaderStyle.module.css"
import { useEffect, useState } from "react";


function Header(){
    const navigate = useNavigate();
    const [Loged,setLoged] = useState(false)
    const location = useLocation();
    useEffect(()=>{
      setLoged(localStorage.getItem('session')!=null)
    },[location])
    const navbar1 = ()=>{
        return(
        <nav className={styles.nav}>
        <div> Nome da aplicacao </div>
        <ul>
            <li>
            <Link to="/login" className={styles.link}>Login</Link>
            </li>
            <li>
            <Link to="/Cadastro" className={styles.link}>Cadastro</Link>
            </li>
        </ul>
    </nav>
        )
    }

    const Exit = ()=>{
        localStorage.clear();
        navigate('/');
    }

    const navbar2 = ()=>{
        return(
        <nav className={styles.nav}>
        <div> Nome da aplicacao </div>
        <ul>
        <li>
            <Link to="/minhasTarefas" className={styles.link}>Ver tarefas</Link>
        </li>
        <li>
            <Link to="/cadastrarTarefa" className={styles.link}>Cadastrar tarefas</Link>
        </li>
           <li onClick={Exit}>Sair</li>
        </ul>
    </nav>
        )
    }
    
    

    if(!Loged){
        return navbar1();
    }else{
        return navbar2();
    }
}

export default Header;