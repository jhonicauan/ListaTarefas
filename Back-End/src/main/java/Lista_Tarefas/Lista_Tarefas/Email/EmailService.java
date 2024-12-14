package Lista_Tarefas.Lista_Tarefas.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public String sendEmail(JavaMailSender javaEmail,String toUser,String subject,String mensage){
        try{
            System.out.println(javaMailSender);
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom("lavantestes@gmail.com");
            simpleMailMessage.setTo(toUser);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(mensage);
            javaEmail.send(simpleMailMessage);
            return "email enviado";
        }catch(Exception e){
            return e.getLocalizedMessage();
        }
    }
    
}