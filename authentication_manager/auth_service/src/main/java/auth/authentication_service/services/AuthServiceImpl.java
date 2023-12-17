package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.enums.TokenType;
import auth.authentication_service.modules.dto.CheckTokenDtoResponse;
import auth.authentication_service.modules.dto.SignInDtoResponse;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserPermissionDto;
import auth.authentication_service.persistence.repositories.TokenRepository;
import auth.authentication_service.services.interfaces.TokenService;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.utils.BCryptPasswordEncoder;
import auth.authentication_service.utils.GenericResponse;
import auth.authentication_service.utils.LoggerUtils;

import java.util.Collection;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
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


    private final AuthenticationConfiguration authenticationManager;
    private final UserDetailsServices userDetailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private GenericResponse<String> genericResponse;

    public AuthServiceImpl(AuthenticationConfiguration authenticationManager, UserDetailsServices userDetailService) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
    }

    // This function is similar to the Sign-in function
    public ResponseEntity<?> authenticated(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username);
        final UserDetails userDetails = userDetailService.loadUserByUsername(username);

        //Validate UserDetails
        if (userDetails == null) {
            _logger.log("Check again your username, or you forgot to sign-up", LoggerType.ERROR);
            return genericResponse.matchingResponseMessage(new GenericResponse<>("User not found", ResponseMessage.msg401));
        }

        //Validate user authentication
        GenericResponse<String> validation = _validateAuthentication(username, password, user);
        if (validation.getResponseMessage() != ResponseMessage.msg200) {
            // return http status code base on validate response message
            return genericResponse.matchingResponseMessage(validation);
        }

        // Generate sign-in information
        SignInDtoResponse response = _generateSignInToken(user, userDetails);
        _logger.log("User: " + user.getUsername() + " sign-in success", LoggerType.INFO);
        
        return ResponseEntity.ok(response);
    }
    private GenericResponse<String> _validateAuthentication(String username, String password, User user) throws Exception {
        try {
            if (user == null) {
                _logger.log("User not found", LoggerType.ERROR);
                return new GenericResponse<>("User not found", ResponseMessage.msg401);
            }

            if (!_checkMatchingPassword(password, user.getPassword())) {
                _logger.log("Incorrect username or password", LoggerType.ERROR);
                return new GenericResponse<>("Incorrect username or password", ResponseMessage.msg401);
            }

            if (!user.isEnabled()) {
                _logger.log("User is inactive", LoggerType.ERROR);
                return new GenericResponse<>("User is inactive", ResponseMessage.msg401);
            }

            authenticationManager.getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

        } catch (BadCredentialsException e) {
            _logger.log("Incorrect username or password", LoggerType.ERROR);
            return new GenericResponse<>("Incorrect username or password", ResponseMessage.msg401);
        }
        return new GenericResponse<>("Validate success", ResponseMessage.msg200);
    }
    private boolean _checkMatchingPassword(String password, String encodedPassword) {
        return passwordEncoder.matches(password, encodedPassword);
    }
    private SignInDtoResponse _generateSignInToken(User user, UserDetails userDetails) {
        String accessToken = _generateAccessToken(user, userDetails);
        String refreshToken = _generateRefreshToken(user, userDetails);
        return new SignInDtoResponse(accessToken, refreshToken, user.getName(), user.getUsername(), user.getEmail(), user.getLastLogin());
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

    public ResponseEntity<?> checkToken(TokenDto token) {
        CheckTokenDtoResponse userResponse = tokenService.checkToken(token.getToken());
        return ResponseEntity.ok(userResponse);
    }

    public ResponseEntity<?> checkPermission(UserPermissionDto permission) {
        User user = userService.getUserById(permission.getUserId());
        Collection<Role> userRole = user.getRoles();
        for (Role role : userRole) {
            Collection<Privilege> rolePrivilege = role.getPrivileges();
            for (Privilege privilege : rolePrivilege) {
                if (privilege.getName().equals(permission.getPermission())) {
                    return ResponseEntity.ok(privilege);
                }
            }
        }
        return ResponseEntity.badRequest().body("Permission denied");

    }

    // public GenericResponse<?> getNewAccessTokenResponse(String refreshToken) throws Exception {
    //     final UserDetails userDetails = userDetailService.loadUserByUsername(tokenService.getUsernameFromToken(refreshToken));
    //     User user = userRepository.findByUsername(tokenService.getUsernameFromToken(refreshToken));
    //     if (user == null) {
    //         _logger.log("User not found", LoggerType.ERROR);
    //         return new GenericResponse<>("User not found", ResponseMessage.msg401);
    //     }
    //     if (!user.isEnabled()) {
    //         _logger.log("User is inactive", LoggerType.ERROR);
    //         return new GenericResponse<>("User is inactive", ResponseMessage.msg401);
    //     }
    //     if (!tokenService.validateToken(refreshToken)) {
    //         _logger.log("Invalid refresh token", LoggerType.ERROR);
    //         return new GenericResponse<>("Invalid refresh token", ResponseMessage.msg401);
    //     }
    //     String newAccessToken = tokenService.generateAccessToken(userDetails);
    //     return new GenericResponse<>(newAccessToken, ResponseMessage.msg200);
    // } 
}

