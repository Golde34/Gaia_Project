package auth.authentication_service.services;

import auth.authentication_service.services.interfaces.TokenService;
import auth.authentication_service.utils.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {

    private final JwtUtil jwtUtil;

    public TokenServiceImpl(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public String generateAccessToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 2; // 2h
        String accessToken = jwtUtil.generateToken(user, expiration);
        return accessToken;
    }

    @Override
    public String generateRefreshToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 24; // 1d
        String refreshToken = jwtUtil.generateToken(user, expiration);
        return refreshToken;
    }

    @Override
    public String getUsernameFromToken(String accessToken) {
        return jwtUtil.exactUsername(accessToken);
    }
}
