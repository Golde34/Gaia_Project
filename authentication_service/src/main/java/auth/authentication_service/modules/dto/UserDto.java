package auth.authentication_service.modules.dto;

@PasswordMatches
public class UserDto {

    @NotNull
    @Size(min=1, message="{Size.userDto.name}")
    private String name;
    
    @NotNull
    @Size(min=1, message="{Size.userDto.username}")
    private String username;
    
    @NotNull
    @ValidEmail
    @Size(min=1, message="{Size.userDto.email}")
    private String email;

    @ValidPassword
    private String password;

    @NotNull
    @Size(min=1)
    private String matchingPassword;

    private boolean isUsing2FA;
}