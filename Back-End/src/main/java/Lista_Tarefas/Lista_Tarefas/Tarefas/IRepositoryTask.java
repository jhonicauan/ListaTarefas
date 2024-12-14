package Lista_Tarefas.Lista_Tarefas.Tarefas;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IRepositoryTask extends JpaRepository<ModelTask,Long>{
    
}
