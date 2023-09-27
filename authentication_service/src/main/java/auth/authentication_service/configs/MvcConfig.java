package auth.authentication_service.configs;


@Configuration
@ComponentScan(basePackages = "auth.authentication_service.modules")
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

    public MvcConfig() {
        super();
    }

    @Autowired
    private MessageSource messageSource;

    @Override
    public void addViewController(final ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/login");
        registry.addViewController("/registration.html");
        registry.addViewController("/logout.html");
        registry.addViewController("/homepage.html");
        registry.addViewController("/expiredAccount.html");
        registry.addViewController("/badUser.html");
        registry.addViewController("/emailError.html");
        registry.addViewController("/home.html");
        registry.addViewController("/invalidSession.html");
        registry.addViewController("/console.html");
        registry.addViewController("/admin.html");
        registry.addViewController("/successRegister.html");
        registry.addViewController("/forgetPassword.html");
        registry.addViewController("/updatePassword.html");
        registry.addViewController("/changePassword.html");
    }

    @Override
    public void configureDefaultServletHandling(final DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/", "/resources/");
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        // final localeChangeInterceptor localeChangeInterceptor = new localeChangeInterceptor();
        // localeChangeInterceptor.setParamName("lang");
        registry.addInterceptor(localeChangeInterceptor());
        registry.addInterceptor(new RequestInterceptor());
    }

    @Bean
    public LocaleResolver localeResolver() {
        final CookieLocaleResolver cookieLocaleResolver = new CookieLocaleResolver();
        cookieLocaleResolver.setDefaultLocale(new Locale("en"));
        return cookieLocaleResolver;
    }

    @Bean
    public EmailValidator usernameValidator() {
        return new EmailValidator();
    }

    @Bean
    public PasswordMatchesValidator passwordMatchesValidator() {
        return new PasswordMatchesValidator();
    }

    @Bean
    @ConditionalOnMissingBean(RequestContextListener.class)
    public RequestContextListener requestContextListener() {
        return new RequestContextListener();
    }

    @Override
    public Validator getValidator() {
        final LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource);
        return bean;
    }

    @Bean
    WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return factory -> factory.setRegisterDefaultServlet(true);
    }
}