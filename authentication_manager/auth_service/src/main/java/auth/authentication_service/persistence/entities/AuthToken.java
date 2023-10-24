package auth.authentication_service.persistence.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import auth.authentication_service.enums.TokenType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class AuthToken {

    @Id
    @GeneratedValue(generator = "token_id")
    private Long id;

    private String token;

    private TokenType tokenType;

    private Date expiryDate;
    
    @JsonBackReference
    @OneToMany(mappedBy = "token")
    private User user;
}
