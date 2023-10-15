package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.RoleRepository;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.utils.BCryptPasswordEncoder;
import auth.authentication_service.utils.GenericResponse;
import auth.authentication_service.utils.LoggerUtils;
import auth.authentication_service.utils.ModelMapperConfig;
import auth.authentication_service.validations.service_validations.UserServiceValidation;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@Primary
public class UserServiceImpl implements UserService {

    @Autowired
    private LoggerUtils _logger;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapperConfig modelMapperConfig;
    @Autowired
    private GenericResponse<String> genericResponse;

    @Autowired
    UserServiceValidation userServiceValidation;

    @Override
    public ResponseEntity createUser(RegisterDto userDto) {
        User user = modelMapperConfig._mapperDtoToEntity(userDto);

        GenericResponse<?> validation = userServiceValidation._validateUserCreation(userDto, user);
        if (validation.getResponseMessage() != ResponseMessage.msg200) {
            // return http status code base on validate response message
            return genericResponse.matchingResponseMessage(validation);
        }

        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        user.setRoles(Collections.singletonList(_isBoss(userDto.isBoss())));
        userRepository.save(user);
        _logger.log("Create user: " + user.getUsername(), LoggerType.INFO);
        return ResponseEntity.ok(user);
    }
    private Role _isBoss(final boolean isBoss) {
        if (isBoss) {
            return roleRepository.findByName("ROLE_BOSS");
        } else {
            return roleRepository.findByName("ROLE_USER");
        }
    }

    @Override
    public ResponseEntity updateUser(UserDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            GenericResponse<?> validation = userServiceValidation._validateUserUpdates(userDto);
            if (validation.getResponseMessage() != ResponseMessage.msg200) {
                // return http status code base on validate response message
                return genericResponse.matchingResponseMessage(validation);
            }

            User updatedUser = userRepository.getUserById(user.getId());
            updatedUser.setUsername(userDto.getUsername());
            updatedUser.setEmail(userDto.getEmail());
            updatedUser.setName(userDto.getName());
            userRepository.save(updatedUser);
            _logger.log("Update user: " + userDto.getUsername() + " to: " + updatedUser.getUsername(), LoggerType.INFO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Update user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return ResponseEntity.badRequest().body("Update user failed");
        }
    }

    @Override
    public ResponseEntity deleteUser(UserDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            GenericResponse<?> validation = userServiceValidation._validateUserDeletion(user);
            if (validation.getResponseMessage() != ResponseMessage.msg200) {
                // return http status code base on validate response message
                return genericResponse.matchingResponseMessage(validation);
            }

            User deleteUser = userRepository.getUserById(user.getId());
            userRepository.delete(deleteUser);
            _logger.log("Delete user: " + userDto.getUsername(), LoggerType.INFO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Delete user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return ResponseEntity.badRequest().body("Delete user failed");
        }
    }

    @Override
    public List<User> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            _logger.log("Get all users", LoggerType.INFO);
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get all users failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserById(RegisterDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            if (_checkExistUserById(user.getId())) {
                _logger.log("Get user: " + user.getUsername(), LoggerType.INFO);
            }
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserByUsername(String username) {
        try {
            User user = userRepository.findByUsername(username);
            _logger.log("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get user: " + username + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserByEmail(String email) {
        try {
            User user = userRepository.findByEmail(email);
            _logger.log("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get user: " + email + " failed", LoggerType.ERROR);
            return null;
        }
    }

    private boolean _checkExistUserById(Long id) {
        try {
            for (User user : userRepository.findAll()) {
                if (Objects.equals(user.getId(), id)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist user: " + id + " failed", LoggerType.ERROR);
        }
        return false;
    }

}
