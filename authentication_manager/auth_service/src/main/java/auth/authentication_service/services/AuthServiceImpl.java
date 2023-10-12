package auth.authentication_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import auth.authentication_service.enums.TokenType;
import auth.authentication_service.persistence.entities.AuthToken;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.TokenRepository;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.securities.UserDetailsServices;
import auth.authentication_service.services.interfaces.AuthService;
import auth.authentication_service.utils.JwtUtil;


@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private UserRepository userRepository;

    private final AuthenticationConfiguration authenticationManager;
    private final UserDetailsServices userDetailService;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(TokenRepository tokenRepository, UserRepository userRepository, AuthenticationConfiguration authenticationManager, UserDetailsServices userDetailsServices, JwtUtil jwtUtil) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailsServices;
        this.jwtUtil = jwtUtil;
    }

    // This function is similar to the Sign-in function
    public String authenticated(String username, String password) throws Exception {
        try {
            authenticationManager.getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailService.loadUserByUsername(username);
        final String jwt = generateAccessToken(userDetails);
        return jwt;
    } 

    public String generateAccessToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 10; // 1 nam
        String accessToken = jwtUtil.generateToken(user, expiration);
        _saveTokenToDB(accessToken, user.getUsername(), TokenType.ACCESS_TOKEN);
        return accessToken;
    }

    public String generateRefreshToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 24 * 30; // 1000 nam :)
        String refreshToken = jwtUtil.generateToken(user, expiration);
        _saveTokenToDB(refreshToken, user.getUsername(), TokenType.REFRESH_TOKEN);
        return refreshToken;
    }
    
    public void _saveTokenToDB(String token, String username, TokenType tokenType) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        AuthToken authToken = tokenRepository.findByUserId(user.getId());
        if (tokenType == TokenType.ACCESS_TOKEN) {
            authToken.setAccessToken(token);
        } else {
            authToken.setRefreshToken(token);
        }
        authToken.setUser(user);
        tokenRepository.save(authToken);
    }

    // public String regenerateToken(String token, UserDetails user, TokenType tokenType) {
    //     String response = "";
    //     if (jwtUtil.validateToken(token, user) && tokenType == TokenType.ACCESS_TOKEN) {
    //         generateAccessToken(user);
    //         response = "Regenerate access token successfully";
    //     } else if (jwtUtil.validateToken(token, user) && tokenType == TokenType.REFRESH_TOKEN) {
    //         generateRefreshToken(user);
    //         response = "Regenerate refresh token successfully";
    //     } else {
    //         response = "Token is invalid. Regenerate failed";
    //         throw new RuntimeException("Token is invalid");
    //     }
    //     return response;
    // }

    @Override
    public String getUsernameFromToken(String accessToken) {
        return jwtUtil.exactUsername(accessToken);
    }

    public boolean validateAccessToken(String accessToken) {
        return false;
    }

    public boolean validateRefreshToken(String refreshToken) {
        return false;
    }
    
}
