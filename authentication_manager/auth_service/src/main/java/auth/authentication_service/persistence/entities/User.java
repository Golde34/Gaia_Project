package auth.authentication_service.persistence.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Collection;

@Entity
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

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
}