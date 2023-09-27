package auth.authentication_service.configs;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Privilege privilefeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
}