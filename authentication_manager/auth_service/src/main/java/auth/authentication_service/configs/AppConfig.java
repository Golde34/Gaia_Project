package auth.authentication_service.configs;

import auth.authentication_service.securities.ActivateUserStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public ActivateUserStore activateUserStore() {
        return new ActivateUserStore();
    }
}