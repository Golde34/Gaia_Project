package auth.authentication_service.configs;

import auth.authentication_service.task.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


// @ImportResource({ "classpath:webSecurityConfig.xml" })
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtF;

    public SecurityConfig(JwtRequestFilter jwtF) {
        this.jwtF = jwtF;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public SecurityExpressionHandler<FilterInvocation> webExpressionHandler() {
        final DefaultWebSecurityExpressionHandler defaultWebSecurityExpressionHandler = new DefaultWebSecurityExpressionHandler();
        defaultWebSecurityExpressionHandler.setRoleHierarchy(roleHierarchy());
        return defaultWebSecurityExpressionHandler;
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        final RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_BOSS > ROLE_ADMIN \n ROLE_ADMIN > ROLE_USER");
        return roleHierarchy;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.disable())
                .csrf(AbstractHttpConfigurer::disable)
                .securityContext((securityContext) -> securityContext.requireExplicitSave(true))
                .authorizeHttpRequests(authz -> {
                    authz
                            .requestMatchers(new AntPathRequestMatcher("/auth/authenticate")).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/auth/user/**")).hasRole("USER")
                            .requestMatchers(new AntPathRequestMatcher("/auth/admin/**")).hasRole("ADMIN")
                            .requestMatchers(new AntPathRequestMatcher("/role/**")).hasRole("ADMIN")
                            .requestMatchers(new AntPathRequestMatcher("/privilege/**")).hasRole("ADMIN")
                            .requestMatchers(new AntPathRequestMatcher("/**")).hasRole("BOSS")
                            .anyRequest().authenticated();
                    ;
                });
        http.addFilterBefore(jwtF, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}