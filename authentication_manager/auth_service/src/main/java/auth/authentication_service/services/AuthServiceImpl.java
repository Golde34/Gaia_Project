package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.modules.dto.SignInDtoResponse;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.services.interfaces.TokenService;
import auth.authentication_service.utils.BCryptPasswordEncoder;
import auth.authentication_service.utils.GenericResponse;
import auth.authentication_service.utils.LoggerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import auth.authentication_service.persistence.entities.AuthToken;
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
    private UserRepository userRepository;

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
    public ResponseEntity authenticated(String username, String password) throws Exception {
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
        SignInDtoResponse token = _generateSignInToken(user, userDetails);
        _logger.log("User: " + user.getUsername() + " sign-in success", LoggerType.INFO);

        return ResponseEntity.ok(token);
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
        AuthToken authToken = new AuthToken();
        authToken.setUser(user);
        authToken.setAccessToken(tokenService.generateAccessToken(userDetails));
        authToken.setRefreshToken(tokenService.generateRefreshToken(userDetails));
        user.setToken(authToken);
        userRepository.save(user);
        return new SignInDtoResponse(authToken.getAccessToken(), authToken.getRefreshToken(), user.getName(), user.getUsername(), user.getEmail());
    }

    public GenericResponse<?> getNewAccessTokenResponse(String refreshToken) throws Exception {
        final UserDetails userDetails = userDetailService.loadUserByUsername(tokenService.getUsernameFromToken(refreshToken));
        User user = userRepository.findByUsername(tokenService.getUsernameFromToken(refreshToken));
        if (user == null) {
            _logger.log("User not found", LoggerType.ERROR);
            return new GenericResponse<>("User not found", ResponseMessage.msg401);
        }
        if (!user.isEnabled()) {
            _logger.log("User is inactive", LoggerType.ERROR);
            return new GenericResponse<>("User is inactive", ResponseMessage.msg401);
        }
        if (!tokenService.validateToken(refreshToken)) {
            _logger.log("Invalid refresh token", LoggerType.ERROR);
            return new GenericResponse<>("Invalid refresh token", ResponseMessage.msg401);
        }
        String newAccessToken = tokenService.generateAccessToken(userDetails);
        return new GenericResponse<>(newAccessToken, ResponseMessage.msg200);
    }

    public ResponseEntity checkToken(TokenDto token) {
        UserDto userResponse = tokenService.checkToken(token.getToken());
        return ResponseEntity.ok(userResponse);
    }
}

