package auth.authentication_service.modules.controllers;

@Controller
@RequestMapping("/auth")
public class RegisterController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService; 
}