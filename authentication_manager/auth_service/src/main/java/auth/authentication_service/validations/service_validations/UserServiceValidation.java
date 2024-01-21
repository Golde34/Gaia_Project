package auth.authentication_service.validations.service_validations;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.utils.BCryptPasswordEncoder;
import auth.authentication_service.utils.GenericResponse;
import auth.authentication_service.utils.LoggerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceValidation {

    private final AuthenticationConfiguration authenticationManager;

    @Autowired
    LoggerUtils _logger;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserServiceValidation(AuthenticationConfiguration authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public GenericResponse<String> _validateUserSignin(UserDetails userDetails, String username, String password, User user) {
        try {
            // Validate UserDetails
            if (userDetails == null) {
                _logger.log("Check again your username, or you forgot to sign-up", LoggerType.ERROR);
                return new GenericResponse<>("User not found", ResponseMessage.msg401);
            }

            // Validate user authentication
            GenericResponse<String> validation = _validateAuthentication(username, password, user);
            if (validation.getResponseMessage() != ResponseMessage.msg200) {
                // return http status code base on validate response message
                return validation;
            }
            return new GenericResponse<>("success", ResponseMessage.msg200);
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Validate user sign in failed", LoggerType.ERROR);
            return new GenericResponse<>("Validate user sign in failed", ResponseMessage.msg400);
        }
    }

    private GenericResponse<String> _validateAuthentication(String username, String password, User user) {
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
                    new UsernamePasswordAuthenticationToken(username, password));

        } catch (BadCredentialsException e) {
            _logger.log("Incorrect username or password", LoggerType.ERROR);
            return new GenericResponse<>("Incorrect username or password", ResponseMessage.msg401);
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Validate authentication failed", LoggerType.ERROR);
            return new GenericResponse<>("Validate authentication failed", ResponseMessage.msg400);
        } finally {
            _logger.log("Validate authentication success", LoggerType.INFO);
        }
        return new GenericResponse<>("Validate success", ResponseMessage.msg200);
    }

    private boolean _checkMatchingPassword(String password, String encodedPassword) {
        return passwordEncoder.matches(password, encodedPassword);
    }

    public GenericResponse<String> _validateUserCreation(RegisterDto userDto, User user) {
        if (_checkExistUser(user)) {
            _logger.log("This account is registered.", LoggerType.WARN);
            return new GenericResponse<>("This account is registered.", ResponseMessage.msg400);
        }

        if (_emailExist(userDto.getEmail())) {
            _logger.log("There is an account with that email address: " + userDto.getEmail(), LoggerType.ERROR);
            return new GenericResponse<>("There is an account with that email address: " + userDto.getEmail(),
                    ResponseMessage.msg400);
        }

        if (_checkExistUsername(userDto.getUsername())) {
            _logger.log("There is an account with that username: " + userDto.getUsername(), LoggerType.ERROR);
            return new GenericResponse<>("There is an account with that username: " + userDto.getUsername(),
                    ResponseMessage.msg400);
        }

        if (!_matchingPassword(userDto.getPassword(), userDto.getMatchingPassword())) {
            _logger.log("Password and Confirm Password do not match", LoggerType.ERROR);
            return new GenericResponse<>("Password and Confirm Password do not match", ResponseMessage.msg400);
        }
        return new GenericResponse<>("Validate User Creates successfully", ResponseMessage.msg200);
    }

    public GenericResponse<String> _validateUserUpdates(UserDto userDto) {
        if (_emailExist(userDto.getEmail())) {
            _logger.log("This email address: " + userDto.getEmail() + " is not changed.", LoggerType.ERROR);
            return new GenericResponse<>("This email address: " + userDto.getEmail() + " is not changed.",
                    ResponseMessage.msg400);
        }

        if (_checkExistUsername(userDto.getUsername())) {
            _logger.log("This account username: " + userDto.getUsername() + " is not changed.", LoggerType.ERROR);
            return new GenericResponse<>("This account username: " + userDto.getUsername() + " is not changed.",
                    ResponseMessage.msg400);
        }
        return new GenericResponse<>("Validate User Updates successfully", ResponseMessage.msg200);
    }

    public GenericResponse<String> _validateUserDeletion(User user) {
        if (_checkExistUser(user)) {
            _logger.log("This account is registered.", LoggerType.INFO);
            return new GenericResponse<>("This account is registered.", ResponseMessage.msg200);
        }
        return new GenericResponse<>("There is error when delete this account.", ResponseMessage.msg400);
    }

    private boolean _emailExist(final String email) {
        return userRepository.findByEmail(email) != null;
    }

    private boolean _matchingPassword(final String password, final String confirmPassword) {
        return password.equals(confirmPassword);
    }

    protected boolean _checkExistUsername(String username) {
        try {
            for (User user : userRepository.findAll()) {
                if (Objects.equals(user.getUsername(), username)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist username: " + username + " failed", LoggerType.ERROR);
        }
        return false;
    }

    protected boolean _checkExistUser(User user) {
        try {
            for (User item : userRepository.findAll()) {
                if (Objects.equals(item.getId(), user.getId()) && Objects.equals(item.getUsername(), user.getUsername())
                        && Objects.equals(item.getEmail(), user.getEmail())) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist user: " + user.getUsername() + " failed", LoggerType.ERROR);
        }
        return false;
    }
}
