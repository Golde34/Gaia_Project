package auth.authentication_service.persistence.entities;

@Data
@Table(name = "user_account")
public class User {
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String username;
    
    private String email;

    @Column(length=60)
    private String password;

    private boolean enabled;

    private boolean isUsing2FA;
    
    private String secret;

    
}