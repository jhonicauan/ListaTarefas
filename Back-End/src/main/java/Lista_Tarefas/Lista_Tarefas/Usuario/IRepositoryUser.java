package Lista_Tarefas.Lista_Tarefas.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IRepositoryUser extends JpaRepository<ModelUser,Long> {
    ModelUser  findByEmail(String email);
}
