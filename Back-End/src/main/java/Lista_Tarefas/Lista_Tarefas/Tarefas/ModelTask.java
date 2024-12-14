package Lista_Tarefas.Lista_Tarefas.Tarefas;


import java.time.LocalDate;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import Lista_Tarefas.Lista_Tarefas.Usuario.ModelUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity(name = "tb_tasks")
@Data
public class ModelTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user",nullable = false)
    @JsonIgnore
    private ModelUser user;

    private String title;

    @Column(length = 3000)
    private String description;

    @CreationTimestamp
    private LocalDate createdAt;

    private LocalDate completedAt;
}
