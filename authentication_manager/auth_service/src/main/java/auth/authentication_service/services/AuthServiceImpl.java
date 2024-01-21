package auth.authentication_service.services;

import auth.authentication_service.enums.BossType;
import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.enums.TokenType;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserPermissionDto;
import auth.authentication_service.modules.dto.response.CheckTokenDtoResponse;
import auth.authentication_service.modules.dto.response.SignInDtoResponse;
import auth.authentication_service.persistence.repositories.TokenRepository;
import auth.authentication_service.services.interfaces.TokenService;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.utils.GenericResponse;
import auth.authentication_service.utils.LoggerUtils;
import auth.authentication_service.validations.service_validations.UserServiceValidation;

import java.util.Collection;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import auth.authentication_service.persistence.entities.AuthToken;
import auth.authentication_service.persistence.entities.Privilege;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.securities.UserDetailsServices;
import auth.authentication_service.services.interfaces.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private LoggerUtils _logger;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenRepository tokenRepository;

    private final UserDetailsServices userDetailService;

    @Autowired
    private GenericResponse<String> genericResponse;
    @Autowired
    private UserServiceValidation userServiceValidation;

    public AuthServiceImpl(UserDetailsServices userDetailService) {
        this.userDetailService = userDetailService;
    }

    // This function is similar to the Sign-in function
    public ResponseEntity<?> authenticated(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username);
        final UserDetails userDetails = userDetailService.loadUserByUsername(username);
        // Validate User
        GenericResponse<String> validate = userServiceValidation._validateUserSignin(userDetails, username, password,
                user);
        if (!validate.getResponseMessage().equals(ResponseMessage.msg200)) {
            return genericResponse.matchingResponseMessage(validate);
        }
        // Generate sign-in information
        SignInDtoResponse response = _generateSignInToken(user, userDetails, BossType.USER);
        _logger.log("User: " + user.getUsername() + " sign-in success", LoggerType.INFO);

        return genericResponse.matchingResponseMessage(new GenericResponse<>(response, ResponseMessage.msg200));
    }

    private SignInDtoResponse _generateSignInToken(User user, UserDetails userDetails, BossType bossType) {
        String accessToken = _generateAccessToken(user, userDetails);
        String refreshToken = _generateRefreshToken(user, userDetails);
        return SignInDtoResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .lastLogin(user.getLastLogin())
                .bossType(bossType.getValue())
                .build();
    }

    private String _generateAccessToken(User user, UserDetails userDetails) {
        AuthToken accessToken = new AuthToken();
        accessToken.setUser(user);
        accessToken.setTokenType(TokenType.ACCESS_TOKEN);
        String generatedToken = tokenService.generateAccessToken(userDetails);
        accessToken.setToken(generatedToken);
        accessToken.setExpiryDate(tokenService.getExpirationDateFromToken(generatedToken));
        tokenRepository.save(accessToken);
        return generatedToken;
    }

    private String _generateRefreshToken(User user, UserDetails userDetails) {
        AuthToken refreshToken = new AuthToken();
        refreshToken.setUser(user);
        refreshToken.setTokenType(TokenType.REFRESH_TOKEN);
        String generatedToken = tokenService.generateRefreshToken(userDetails);
        refreshToken.setToken(generatedToken);
        refreshToken.setExpiryDate(tokenService.getExpirationDateFromToken(generatedToken));
        tokenRepository.save(refreshToken);
        user.setLastLogin(new Date());
        userRepository.save(user);
        return generatedToken;
    }

    public ResponseEntity<?> gaiaAutoSignin(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username);
        final UserDetails userDetails = userDetailService.loadUserByUsername(username);
        // Validate User
        GenericResponse<String> validate = userServiceValidation._validateUserSignin(userDetails, username, password,
                user);
        if (!validate.getResponseMessage().equals(ResponseMessage.msg200)) {
            return genericResponse.matchingResponseMessage(validate);
        }
        // Generate sign-in information
        if (user.getRoles().stream().anyMatch(role -> role.getName().equals(BossType.BOSS.getRole()))) {
            SignInDtoResponse response = _generateSignInToken(user, userDetails, BossType.BOSS);
            _logger.log("Boss: " + user.getUsername() + " sign-in success", LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(response, ResponseMessage.msg200));
        } else {
            return genericResponse
                    .matchingResponseMessage(new GenericResponse<>("Permission denied", ResponseMessage.msg401));
        }
    }

    public ResponseEntity<?> checkToken(TokenDto token) {
        CheckTokenDtoResponse userResponse = tokenService.checkToken(token.getToken());
        return genericResponse.matchingResponseMessage(new GenericResponse<>(userResponse, ResponseMessage.msg200));
    }

    public ResponseEntity<?> checkPermission(UserPermissionDto permission) {
        User user = userService.getUserById(permission.getUserId());
        Collection<Role> userRole = user.getRoles();
        for (Role role : userRole) {
            Collection<Privilege> rolePrivilege = role.getPrivileges();
            for (Privilege privilege : rolePrivilege) {
                if (privilege.getName().equals(permission.getPermission())) {
                    return genericResponse
                            .matchingResponseMessage(new GenericResponse<>(privilege, ResponseMessage.msg200));
                }
            }
        }
        return genericResponse
                .matchingResponseMessage(new GenericResponse<>("Permission denied", ResponseMessage.msg401));
    }

    public ResponseEntity<?> checkStatus() {
        return genericResponse.matchingResponseMessage(
                new GenericResponse<>("Authentication service is running", ResponseMessage.msg200));
    }

    // public GenericResponse<?> getNewAccessTokenResponse(String refreshToken)
    // throws Exception {
    // final UserDetails userDetails =
    // userDetailService.loadUserByUsername(tokenService.getUsernameFromToken(refreshToken));
    // User user =
    // userRepository.findByUsername(tokenService.getUsernameFromToken(refreshToken));
    // if (user == null) {
    // _logger.log("User not found", LoggerType.ERROR);
    // return new GenericResponse<>("User not found", ResponseMessage.msg401);
    // }
    // if (!user.isEnabled()) {
    // _logger.log("User is inactive", LoggerType.ERROR);
    // return new GenericResponse<>("User is inactive", ResponseMessage.msg401);
    // }
    // if (!tokenService.validateToken(refreshToken)) {
    // _logger.log("Invalid refresh token", LoggerType.ERROR);
    // return new GenericResponse<>("Invalid refresh token",
    // ResponseMessage.msg401);
    // }
    // String newAccessToken = tokenService.generateAccessToken(userDetails);
    // return new GenericResponse<>(newAccessToken, ResponseMessage.msg200);
    // }
}
