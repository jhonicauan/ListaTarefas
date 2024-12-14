package Lista_Tarefas.Lista_Tarefas;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permite todos os endpoints
        .allowedOrigins("http://localhost:5173") // Permite o frontend específico
        .allowedMethods("GET", "POST", "PUT", "DELETE") // Adiciona o método PUT
        .allowedHeaders("*") // Permite qualquer cabeçalho
        .allowCredentials(true); // Permite cookies/credenciais, se necessário
    }
}
