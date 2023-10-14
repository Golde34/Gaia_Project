package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.modules.dto.SignInDtoResponse;
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
    private GenericResponse genericResponse;

    public AuthServiceImpl(AuthenticationConfiguration authenticationManager, UserDetailsServices userDetailService) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
    }

    // This function is similar to the Sign-in function
    public ResponseEntity authenticated(String username, String password) throws Exception {
        final UserDetails userDetails = userDetailService.loadUserByUsername(username);
        User user = userRepository.findByUsername(username);

        //Validate user authentication
        GenericResponse<String> validation = _validateAuthentication(username, password, user);
        if (validation.getResponseMessage() != ResponseMessage.msg200) {
            return genericResponse.matchingResponseMessage(validation.getResponseMessage());
        }

        // Generate token
        SignInDtoResponse token = _generateSignInToken(user, userDetails);

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
    private SignInDtoResponse _generateSignInToken(User user, UserDetails userDetails) {
        AuthToken authToken = new AuthToken();
        authToken.setUser(user);
        authToken.setAccessToken(tokenService.generateAccessToken(userDetails));
        authToken.setRefreshToken(tokenService.generateRefreshToken(userDetails));
        user.setToken(authToken);
        userRepository.save(user);
        return new SignInDtoResponse(authToken.getAccessToken(), authToken.getRefreshToken(), user.getName(), user.getUsername(), user.getEmail());
    }
    public boolean _checkMatchingPassword(String password, String encodedPassword) {
        return passwordEncoder.matches(password, encodedPassword);
    }
}

