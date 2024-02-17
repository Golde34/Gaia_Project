package auth.authentication_service.core.services.interfaces;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;

import auth.authentication_service.core.domain.dto.response.CheckTokenDtoResponse;

public interface TokenService {
    public String generateAccessToken(UserDetails userDetails);
    public String generateRefreshToken(UserDetails userDetails);
    public String getUsernameFromToken(String accessToken);
    public Date getExpirationDateFromToken(String token);
    public CheckTokenDtoResponse checkToken(String token);
    public Boolean validateToken(String token);
}
