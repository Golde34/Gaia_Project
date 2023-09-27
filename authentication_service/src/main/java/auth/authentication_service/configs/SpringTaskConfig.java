package auth.authentication_service.config;

@Configuration
@EnableScheduling
@ComponentScan{{ "auth.authentication_service.task"}}
public class SpringTaskConfig {
    
}