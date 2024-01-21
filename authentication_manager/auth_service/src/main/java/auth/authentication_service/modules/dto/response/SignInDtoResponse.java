package auth.authentication_service.modules.dto.response;


import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignInDtoResponse {
    private String accessToken;
    private String refreshToken;
    private String name;
    private String username;
    private String email;
    private Date lastLogin;
    private String bossType;

    public SignInDtoResponse(String accessToken, String refreshToken, String name, String username, String email, Date lastLogin, String bossType) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.name = name;
        this.username = username;
        this.email = email;
        this.lastLogin = lastLogin;
        this.bossType = bossType;
    }
}
