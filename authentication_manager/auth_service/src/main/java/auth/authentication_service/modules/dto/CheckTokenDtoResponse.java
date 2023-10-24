package auth.authentication_service.modules.dto;

//import auth.authentication_service.validations.dto_validations.ValidPassword;
import lombok.Data;

@Data
public class CheckTokenDtoResponse {
    
    private Long id;
    private String username;
    private String accessToken;

    public CheckTokenDtoResponse(Long id, String username, String accessToken) {
        this.id = id;
        this.username = username;
        this.accessToken = accessToken;
    }
}