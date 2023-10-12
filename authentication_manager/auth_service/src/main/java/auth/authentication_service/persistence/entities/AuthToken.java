package auth.authentication_service.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class AuthToken {

    @Id
    @GeneratedValue(generator = "token_id")
    private Long id;

    private String accessToken;
    
    private String refreshToken;

    @JsonBackReference
    @OneToOne(mappedBy = "token")
    private User user;    
}
