package auth.authentication_service.configs;

import auth.authentication_service.securities.ActivateUserStore;

@Configuration
public class AppConfig {

    @Bean
    public ActivateUserStore activateUserStore() {
        return new ActivateUserStore();
    }
}