package auth.authentication_service.validations.service_validations;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.services.UserServiceImpl;
import auth.authentication_service.utils.GenericResponse;
import auth.authentication_service.utils.LoggerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceValidation {

    @Autowired
    LoggerUtils _logger;
    @Autowired
    private UserRepository userRepository;

    public GenericResponse<String> _validateUserCreation(RegisterDto userDto, User user) {
        if (_checkExistUser(user)) {
            _logger.log("This account is registered.", LoggerType.WARN);
            return new GenericResponse<>("This account is registered.", ResponseMessage.msg400);
        }

        if (_emailExist(userDto.getEmail())) {
            _logger.log("There is an account with that email address: " + userDto.getEmail(), LoggerType.ERROR);
            return new GenericResponse<>("There is an account with that email address: " + userDto.getEmail(), ResponseMessage.msg400);
        }

        if (_checkExistUsername(userDto.getUsername())) {
            _logger.log("There is an account with that username: " + userDto.getUsername(), LoggerType.ERROR);
            return new GenericResponse<>("There is an account with that username: " + userDto.getUsername(), ResponseMessage.msg400);
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
            return new GenericResponse<>("This email address: " + userDto.getEmail() + " is not changed.", ResponseMessage.msg400);
        }

        if (_checkExistUsername(userDto.getUsername())) {
            _logger.log("This account username: " + userDto.getUsername() + " is not changed.", LoggerType.ERROR);
            return new GenericResponse<>("This account username: " + userDto.getUsername() + " is not changed.", ResponseMessage.msg400);
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
            for (User item: userRepository.findAll()) {
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
