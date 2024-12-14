package Lista_Tarefas.Lista_Tarefas.Tarefas;


import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Lista_Tarefas.Lista_Tarefas.Usuario.IRepositoryUser;
import Lista_Tarefas.Lista_Tarefas.Usuario.ModelUser;
import Lista_Tarefas.Lista_Tarefas.Utils.Utils;

@RestController
@RequestMapping("/tasks")
@SuppressWarnings("rawtypes")
public class ControllerTask {

    @Autowired
    private IRepositoryTask repositoryTask;

    @Autowired
    private IRepositoryUser repositoryUser;

    @PostMapping("/add")
    public ResponseEntity createTask(@RequestBody DTOTask infoTask){
        try
        {
        ModelUser user = repositoryUser.findById(infoTask.getIdUser()).get();
        ModelTask task = new ModelTask();
        task.setTitle(infoTask.getTitle());
        task.setDescription(infoTask.getDescription());
        task.setUser(user);
        repositoryTask.save(task);
        return ResponseEntity.accepted().body(task.getUser());
        }catch(Error e){
            return ResponseEntity.badRequest().body("Não sei oq bota aqui");
        }
    }

    @GetMapping("/viewAllTasks/{id}")
    public ResponseEntity viewAllTasks(@PathVariable Long id){
        ModelUser user = repositoryUser.findById(id).get();
        return ResponseEntity.accepted().body(user.getTasks());
    }

    @GetMapping("/viewTask/{idUser}/{idTask}")
    public ResponseEntity viewTasks(@PathVariable Long idUser,@PathVariable Long idTask){
        ModelTask task = repositoryTask.findById(idTask).get();
        Long checkIdUser = task.getUser().getId();
        if(checkIdUser != idUser){
            return ResponseEntity.badRequest().body("Você não tem permissão para ver essa tarefa");
        }
        return ResponseEntity.accepted().body(task);
    }

    @PutMapping("/update")
    public ResponseEntity updateTask(@RequestBody ModelTask newTask){
        ModelTask originalTask = repositoryTask.findById(newTask.getId()).get();
        newTask.setTitle(Utils.replaceNull(originalTask.getTitle(),newTask.getTitle()));
        newTask.setDescription(Utils.replaceNull(originalTask.getDescription(), newTask.getDescription()));
        newTask.setCompletedAt(originalTask.getCompletedAt());
        newTask.setUser(originalTask.getUser());
        newTask.setCreatedAt(originalTask.getCreatedAt());
        var task = repositoryTask.save(newTask);
        return ResponseEntity.accepted().body(task);
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity complete(@PathVariable Long id){
        ModelTask task = repositoryTask.findById(id).get();
        task.setCompletedAt(LocalDate.now());
        var completedTask = repositoryTask.save(task);
        return ResponseEntity.accepted().body(completedTask);
    }

    @PutMapping("/restart/{id}")
    public ResponseEntity restart(@PathVariable Long id){
        ModelTask task = repositoryTask.findById(id).get();
        task.setCompletedAt(null);
        var completedTask = repositoryTask.save(task);
        return ResponseEntity.accepted().body(completedTask);
    }

}
