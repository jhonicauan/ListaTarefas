import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import RegisterUser from "./Pages/RegisterUser";
import "./Styles/Global.css"
import Home from "./Pages/Home";
import Recover from "./Pages/RecoverAccount";
import RegisterTask from "./Pages/RegisterTask";
import MyTasks from "./Pages/MyTasks";
import ViewTask from "./Pages/ViewTask";
import UpdateTask from "./Pages/UpdateTask";

function App() {
  return(
    <><Router>
      <Header/>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<RegisterUser />}/>
          <Route path='/' element={<Home />}/>
          <Route path="/recuperar" element={<Recover/>}/>
          <Route path="/cadastrarTarefa" element={<RegisterTask/>}/>
          <Route path="/minhasTarefas" element={<MyTasks/>}/>
          <Route path="/tarefa" element={<ViewTask/>}/>
          <Route path="/atualizarTarefa" element={<UpdateTask/>}/>
        </Routes>
      </main>
    </Router></>
  )
}

export default App;
