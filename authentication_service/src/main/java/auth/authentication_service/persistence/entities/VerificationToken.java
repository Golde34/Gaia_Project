package auth.authentication_service.persistence.entities;

@Entity
public class VerificationToken {

    private static final int EXPIRATION = 60 * 24;

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id",
        Foreignkey = @ForeignKey(name = "FK_VERIFY_USER"))
    private User user;

    private Date expiryDate;
}