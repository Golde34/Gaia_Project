package auth.authentication_service.modules.dto.request;

import lombok.Data;

@Data
public class SignInDtoRequest {
    private String username;
    private String password;
}
