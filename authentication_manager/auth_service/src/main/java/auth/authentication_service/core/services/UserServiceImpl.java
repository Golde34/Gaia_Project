package auth.authentication_service.core.services;

import auth.authentication_service.core.domain.dto.RegisterDto;
import auth.authentication_service.core.domain.dto.UserDto;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.domain.entities.User;
import auth.authentication_service.core.domain.enums.LoggerType;
import auth.authentication_service.core.domain.enums.ResponseMessage;
import auth.authentication_service.core.services.interfaces.UserService;
import auth.authentication_service.core.store.RoleStore;
import auth.authentication_service.core.store.UserCRUDStore;
import auth.authentication_service.core.validations.service_validations.UserServiceValidation;
import auth.authentication_service.kernel.utils.BCryptPasswordEncoder;
import auth.authentication_service.kernel.utils.GenericResponse;
import auth.authentication_service.kernel.utils.LoggerUtils;
import auth.authentication_service.kernel.utils.ModelMapperConfig;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@Primary
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private LoggerUtils _logger;

    private final UserCRUDStore userStore;
    private final RoleStore roleStore;

    @Autowired
    private ModelMapperConfig modelMapperConfig;
    @Autowired
    private GenericResponse<String> genericResponse;

    @Autowired
    UserServiceValidation userServiceValidation;

    public UserServiceImpl(UserCRUDStore userStore, RoleStore roleStore) {
        this.userStore = userStore;
        this.roleStore = roleStore;
    }

    @Override
    public ResponseEntity<?> createUser(RegisterDto userDto) {
        User user = modelMapperConfig._mapperDtoToEntity(userDto);

        GenericResponse<?> validation = userServiceValidation._validateUserCreation(userDto, user);
        if (validation.getResponseMessage() != ResponseMessage.msg200) {
            // return http status code base on validate response message
            return genericResponse.matchingResponseMessage(validation);
        }

        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        user.setRoles(Collections.singletonList(_isBoss(userDto.isBoss())));
        userStore.save(user);
        _logger.log("Create user: " + user.getUsername(), LoggerType.INFO);
        return ResponseEntity.ok(user);
    }
    private Role _isBoss(final boolean isBoss) {
        if (isBoss) {
            return roleStore.findByName("ROLE_BOSS");
        } else {
            return roleStore.findByName("ROLE_USER");
        }
    }

    @Override
    public ResponseEntity<?> updateUser(UserDto userDto) {
        try {
            log.info("Update user: " + userDto);
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            GenericResponse<?> validation = userServiceValidation._validateUserUpdates(userDto);
            if (validation.getResponseMessage() != ResponseMessage.msg200) {
                // return http status code base on validate response message
                return genericResponse.matchingResponseMessage(validation);
            }

            User updatedUser = userStore.getUserById(user.getId());
            updatedUser.setUsername(userDto.getUsername());
            updatedUser.setEmail(userDto.getEmail());
            updatedUser.setName(userDto.getName());
            userStore.save(updatedUser);
            _logger.log("Update user: " + userDto.getUsername() + " to: " + updatedUser.getUsername(), LoggerType.INFO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Update user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return ResponseEntity.badRequest().body("Update user failed");
        }
    }

    @Override
    public ResponseEntity<?> deleteUser(UserDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            GenericResponse<?> validation = userServiceValidation._validateUserDeletion(user);
            if (validation.getResponseMessage() != ResponseMessage.msg200) {
                // return http status code base on validate response message
                return genericResponse.matchingResponseMessage(validation);
            }

            User deleteUser = userStore.getUserById(user.getId());
            userStore.delete(deleteUser);
            _logger.log("Delete user: " + userDto.getUsername(), LoggerType.INFO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Delete user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return ResponseEntity.badRequest().body("Delete user failed");
        }
    }

    @Override
    @Cacheable(value = "users")
    public List<User> getAllUsers() {
        try {
            List<User> users = userStore.findAll();
            _logger.log("Get all users", LoggerType.INFO);
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get all users failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserById(Long id) {
        try {
            User user = userStore.getUserById(id);
            _logger.log("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get user: " + id + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserByUsername(String username) {
        try {
            User user = userStore.findByUsername(username);
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
            User user = userStore.findByEmail(email);
            _logger.log("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Get user: " + email + " failed", LoggerType.ERROR);
            return null;
        }
    }
}
