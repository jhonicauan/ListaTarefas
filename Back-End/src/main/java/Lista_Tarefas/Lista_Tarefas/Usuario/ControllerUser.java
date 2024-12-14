package Lista_Tarefas.Lista_Tarefas.Usuario;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Lista_Tarefas.Lista_Tarefas.Email.EmailModel;
import Lista_Tarefas.Lista_Tarefas.Email.EmailService;
import at.favre.lib.crypto.bcrypt.BCrypt;

@RestController
@RequestMapping("/users")
@SuppressWarnings("rawtypes")
public class ControllerUser {
    @Autowired
    IRepositoryUser repositoryUser;

    
	@PostMapping("/add")
    public ResponseEntity createUser(@RequestBody ModelUser modelUser){
        var email = modelUser.getEmail();
        if(checkEmail(email)){
            return ResponseEntity.badRequest().body("Email já tem uma conta relacionada");
        }
        if(modelUser.getPassword().length() < 8){
            return ResponseEntity.badRequest().body("A senha do usuario deve conter no minímo 8 caracteres");
        }
        var senha = BCrypt.withDefaults().hashToString(12,modelUser.getPassword().toCharArray());

        modelUser.setPassword(senha);

        var newUser = repositoryUser.save(modelUser);

        return ResponseEntity.accepted().body(newUser);
    }

    @GetMapping("/view")
    public ResponseEntity getUser(){
        List<ModelUser> users = repositoryUser.findAll();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping("/login")
    public boolean checkLogin(@RequestBody Map<String,String> getData){
        String email = getData.get("email");
        ModelUser user = repositoryUser.findByEmail(email);
        if(user == null){
            return false;
        }
        return checkPassword(getData.get("password"), user.getPassword());
    }

    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody ModelUser modelUser){

        if(modelUser.getPassword().length() < 8){
            return ResponseEntity.badRequest().body("A senha deve ter no minimo 8 caracteres");
        }
        String email = modelUser.getEmail();
        ModelUser originalUser = repositoryUser.findByEmail(email);
        String newPassword = BCrypt.withDefaults().hashToString(12,modelUser.getPassword().toCharArray());
        modelUser.setId(originalUser.getId());
        modelUser.setName(originalUser.getName());
        modelUser.setPassword(newPassword);
        var newUser = repositoryUser.save(modelUser);
        return ResponseEntity.accepted().body(newUser);
    }

    @GetMapping("/getId/{email}")
    public Long getIdLogin(@PathVariable String email){
        ModelUser user = repositoryUser.findByEmail(email);
        return user.getId();
    }

    public boolean checkEmail(String email){
        return repositoryUser.findByEmail(email) != null;
    }

    public boolean checkPassword(String password, String userPassword){
        char[] charPassword = password.toCharArray();
        char[] charUserPassword = userPassword.toCharArray();
        return BCrypt.verifyer().verify(charPassword, charUserPassword).verified; 
    }

    @Autowired
    JavaMailSender javamail;
    @PostMapping("/email")
    public void email(@RequestBody EmailModel emailContent){
        EmailService email = new EmailService();
        String userTo = emailContent.getUserTo();
        String subject = emailContent.getSubject();
        String text = emailContent.getMessenge();
        email.sendEmail(javamail,userTo,subject,text);
    }
}
