package auth.authentication_service.services.interfaces;

import org.springframework.security.core.userdetails.UserDetails;

public interface TokenService {
    public String generateAccessToken(UserDetails userDetails);
    public String generateRefreshToken(UserDetails userDetails);
    public String getUsernameFromToken(String accessToken);
}
