package auth.authentication_service.core.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Role {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonBackReference
    @ManyToMany(mappedBy="roles")
    private Collection<User> users;

    @JsonManagedReference
    @ManyToMany
    @JoinTable(name="roles_privileges", 
        joinColumns = @JoinColumn(name="role_id", referencedColumnName="id"), 
        inverseJoinColumns = @JoinColumn(name="privilege_id", referencedColumnName="id"))
    private Collection<Privilege> privileges;

    public Role(String name) {
        this.name = name;
    }

    public Role() {

    }
}