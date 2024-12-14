package Lista_Tarefas.Lista_Tarefas.Usuario;

import java.util.List;

import Lista_Tarefas.Lista_Tarefas.Tarefas.ModelTask;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity(name = "tb_user")
@Data
public class ModelUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<ModelTask> tasks;
}
