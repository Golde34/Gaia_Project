package auth.authentication_service.configs;

// @ImportResource({ "classpath:webSecurityConfig.xml" })
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationSuccessHandler successHandler;

    @Autowired
    private LogoutSuccessHandler logoutSuccessHandler;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
            .authenticationProvider(authProvider())
            .and()
            .build();
    }

    @Bean 
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
            .requestMatchers(new AntPathRequestMatcher("/resources/**"));
    }

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http.csrf(AbstractHttpConfigurer::disable)
    //         .securityContext((securityContext) -> securityContext.requireExplicitSave(true))
    //         .authorizeHttpRequests(authz -> {
    //             authz.requestMatchers(HttpMethod.GET, "/roleHierarchy")
    //                 .hasRole("STAFF")
    //                 .requestMatchers("/login*", "/logout*", "/signin/**", "/signup/**", "/customLogin", "/user/registration*", "/registrationConfirm*", "/expiredAccount*", "/registration*", "/badUser*", "/user/resendRegistrationToken*", "/forgetPassword*",
    //                     "/user/resetPassword*", "/user/savePassword*", "/updatePassword*", "/user/changePassword*", "/emailError*", "/resources/**", "/old/user/registration*", "/successRegister*", "/qrcode*", "/user/enableNewLoc*")
    //                 .permitAll()
    //                 .requestMatchers("/invalidSession*")
    //                 .anonymous()
    //                 .requestMatchers("/user/updatePassword*")
    //                 .hasAuthority("CHANGE_PASSWORD_PRIVILEGE")
    //                 .requestMatchers("/console")
    //                 .hasAuthority("READ_PRIVILEGE")
    //                 .anyRequest()
    //                 .hasAuthority("READ_PRIVILEGE");
    //         })
    //         .formLogin((formLogin) -> formLogin.loginPage("/login")
    //             .defaultSuccessUrl("/homepage.html")
    //             .failureUrl("/login?error=true")
    //             .successHandler(myAuthenticationSuccessHandler)
    //             .failureHandler(authenticationFailureHandler)
    //             .authenticationDetailsSource(authenticationDetailsSource)
    //             .permitAll())
    //         .sessionManagement((sessionManagement) -> sessionManagement.invalidSessionUrl("/invalidSession.html")
    //             .maximumSessions(1)
    //             .sessionRegistry(sessionRegistry()))
    //         .logout((logout) -> logout.logoutSuccessHandler(myLogoutSuccessHandler)
    //             .invalidateHttpSession(true)
    //             .logoutSuccessUrl("/logout.html?logSucc=true")
    //             .deleteCookies("JSESSIONID")
    //             .permitAll())
    //         .rememberMe((remember) -> remember.rememberMeServices(rememberMeServices()));

    //     return http.build();
    // }

    // // beans
    // @Bean
    // public SecurityExpressionHandler<FilterInvocation> customWebSecurityExpressionHandler() {
    //     DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
    //     expressionHandler.setRoleHierarchy(roleHierarchy());
    //     return expressionHandler;
    // }

    // @Bean
    // public DaoAuthenticationProvider authProvider() {
    //     final CustomAuthenticationProvider authProvider = new CustomAuthenticationProvider();
    //     authProvider.setUserDetailsService(userDetailsService);
    //     authProvider.setPasswordEncoder(passwordEncoder());
    //     authProvider.setPostAuthenticationChecks(differentLocationChecker());
    //     return authProvider;
    // }

    // @Bean
    // public PasswordEncoder passwordEncoder() {
    //     return new BCryptPasswordEncoder(11);
    // }

    // @Bean
    // public SessionRegistry sessionRegistry() {
    //     return new SessionRegistryImpl();
    // }

    // @Bean
    // public RememberMeServices rememberMeServices() {
    //     CustomRememberMeServices rememberMeServices = new CustomRememberMeServices("theKey", userDetailsService, new InMemoryTokenRepositoryImpl());
    //     return rememberMeServices;
    // }

    // @Bean(name = "GeoIPCountry")
    // public DatabaseReader databaseReader() throws IOException, GeoIp2Exception {
    //     final File resource = new File(this.getClass()
    //         .getClassLoader()
    //         .getResource("maxmind/GeoLite2-Country.mmdb")
    //         .getFile());
    //     return new DatabaseReader.Builder(resource).build();
    // }

    // @Bean
    // public RoleHierarchy roleHierarchy() {
    //     RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
    //     String hierarchy = "ROLE_ADMIN > ROLE_STAFF \n ROLE_STAFF > ROLE_USER";
    //     roleHierarchy.setHierarchy(hierarchy);
    //     return roleHierarchy;
    // }

    // @Bean
    // public HttpSessionEventPublisher httpSessionEventPublisher() {
    //     return new HttpSessionEventPublisher();
    // }

    // @Bean
    // public DifferentLocationChecker differentLocationChecker() {
    //     return new DifferentLocationChecker();
    // }
}