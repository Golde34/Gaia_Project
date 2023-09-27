package auth.authentication_service.modules.dto;

public class PasswordDto {
    
    private String oldPassword;

    @ValidPassword
    private String newPassword;

    private String token;
}