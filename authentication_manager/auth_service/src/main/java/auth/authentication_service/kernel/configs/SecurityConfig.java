package auth.authentication_service.kernel.configs;

import auth.authentication_service.core.domain.constant.Constants;
import auth.authentication_service.core.services.GlobalConfigService;
import lombok.extern.slf4j.Slf4j;
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

import auth.authentication_service.infrastructure.task.JwtRequestFilter;

// @ImportResource({ "classpath:webSecurityConfig.xml" })
@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

    private final JwtRequestFilter jwtF;
    private final GlobalConfigService globalConfigService;

    public SecurityConfig(JwtRequestFilter jwtF, GlobalConfigService globalConfigService) {
        this.jwtF = jwtF;
        this.globalConfigService = globalConfigService;
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
        String roleHierarchyStr = globalConfigService.getGlobalParamAsString(Constants.AuthConfiguration.ROLE_HIERARCHY);
        log.info("RoleHierarchy : {}", roleHierarchyStr);
        roleHierarchy.setHierarchy(roleHierarchyStr);
        return roleHierarchy;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.disable())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    auth
                            .requestMatchers(new AntPathRequestMatcher("/auth/sign-in"),
                                    new AntPathRequestMatcher("/auth/gaia-auto-sign-in"),
                                    new AntPathRequestMatcher("/auth/check-permission"),
                                    new AntPathRequestMatcher("/auth/status"),
                                    new AntPathRequestMatcher("/user/**"),
                                    new AntPathRequestMatcher("/role/**"),
                                    new AntPathRequestMatcher("/privilege/**"))
                            .permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/auth/user/**")).hasRole("USER")
                            .requestMatchers(new AntPathRequestMatcher("/auth/admin/**")).hasRole("ADMIN")
                            .requestMatchers(new AntPathRequestMatcher("/role/**")).hasRole("ADMIN")
                            .requestMatchers(new AntPathRequestMatcher("/privilege/**")).hasRole("ADMIN")
                            .requestMatchers(new AntPathRequestMatcher("/**")).hasRole("BOSS")
                            .anyRequest().authenticated();
                });
        http.addFilterBefore(jwtF, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}