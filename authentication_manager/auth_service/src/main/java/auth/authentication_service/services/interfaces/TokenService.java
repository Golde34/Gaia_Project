package auth.authentication_service.services.interfaces;

import org.springframework.security.core.userdetails.UserDetails;

import auth.authentication_service.modules.dto.UserDto;

public interface TokenService {
    public String generateAccessToken(UserDetails userDetails);
    public String generateRefreshToken(UserDetails userDetails);
    public String getUsernameFromToken(String accessToken);
    public UserDto checkToken(String token);
    public Boolean validateToken(String token);
}
