package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.utils.LoggerUtils;
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

import java.util.HashMap;


@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    LoggerUtils _logger;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private UserRepository userRepository;

    private final AuthenticationConfiguration authenticationManager;
    private final UserDetailsServices userDetailService;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(TokenRepository tokenRepository, UserRepository userRepository,
                           AuthenticationConfiguration authenticationManager, UserDetailsServices userDetailsServices,
                           JwtUtil jwtUtil, LoggerUtils _logger) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailsServices;
        this.jwtUtil = jwtUtil;
        this._logger = _logger;
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
        User user = userRepository.findByUsername(username);
        String token = validateUserAuthentication(user, userDetails);
        return token;
    }

    public String validateUserAuthentication(User user, UserDetails userDetails) {
        String accessToken = "";
        if (!_userHasToken(user)) {
            _logger.log("User token is null", LoggerType.WARN);
            _createFirstToken(user, userDetails);
            accessToken = user.getToken().getAccessToken();
        }  else {
            accessToken = generateAccessToken(userDetails);
            user.getToken().setAccessToken(accessToken);
            userRepository.save(user);
        }
        return accessToken;
    }

    public boolean _userHasToken(User user) {
        return user.getToken() != null;
    }

    public void _createFirstToken(User user, UserDetails userDetails) {
        AuthToken authToken = new AuthToken();
        authToken.setUser(user);
        authToken.setAccessToken(generateAccessToken(userDetails));
        authToken.setRefreshToken(generateRefreshToken(userDetails));
        user.setToken(authToken);
        userRepository.save(user);
    }

    public String generateAccessToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 2; // 2h
        String accessToken = jwtUtil.generateToken(user, expiration);
        return accessToken;
    }

    public String generateRefreshToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 24; // 1d
        String refreshToken = jwtUtil.generateToken(user, expiration);
        return refreshToken;
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

