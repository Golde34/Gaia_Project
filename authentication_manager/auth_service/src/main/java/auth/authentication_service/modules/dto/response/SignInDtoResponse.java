package auth.authentication_service.modules.dto.response;


import java.util.Date;

import auth.authentication_service.enums.BossType;
import lombok.Data;

@Data
public class SignInDtoResponse {
    private String accessToken;
    private String refreshToken;
    private String name;
    private String username;
    private String email;
    private Date lastLogin;
    private BossType bossType;

    public SignInDtoResponse(String accessToken, String refreshToken, String name, String username, String email, Date lastLogin, BossType bossType) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.name = name;
        this.username = username;
        this.email = email;
        this.lastLogin = lastLogin;
        this.bossType = bossType;
    }
}
