package auth.authentication_service.modules.dto;

import lombok.Data;

@Data
public class LoginDto {
    private String username;
    private String password;
}
