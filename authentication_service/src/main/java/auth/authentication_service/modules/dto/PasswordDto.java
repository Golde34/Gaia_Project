package auth.authentication_service.modules.dto;

import auth.authentication_service.validations.ValidPassword;
import lombok.Data;

@Data
public class PasswordDto {
    
    private String oldPassword;

    @ValidPassword
    private String newPassword;

    private String token;
}