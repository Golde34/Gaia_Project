package auth.authentication_service.core.services;

import auth.authentication_service.core.domain.constant.Constants;
import auth.authentication_service.core.domain.dto.RegisterDto;
import auth.authentication_service.core.domain.dto.UserDto;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.domain.entities.User;
import auth.authentication_service.core.domain.enums.BossType;
import auth.authentication_service.core.domain.enums.LoggerType;
import auth.authentication_service.core.domain.enums.ResponseEnum;
import auth.authentication_service.core.services.interfaces.UserService;
import auth.authentication_service.core.store.RoleStore;
import auth.authentication_service.core.store.UserCRUDStore;
import auth.authentication_service.core.validations.service_validations.UserServiceValidation;
import auth.authentication_service.kernel.utils.BCryptPasswordEncoder;
import auth.authentication_service.kernel.utils.GenericResponse;
import auth.authentication_service.kernel.utils.LoggerUtils;
import auth.authentication_service.kernel.utils.ModelMapperConfig;
import auth.authentication_service.kernel.utils.ResponseUtils;
import jakarta.transaction.Transactional;

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
public class UserServiceImpl implements UserService {

    @Autowired
    private LoggerUtils _logger;

    private final UserCRUDStore userStore;
    private final RoleStore roleStore;

    @Autowired
    private ModelMapperConfig modelMapperConfig;
    @Autowired
    private GenericResponse<?> genericResponse;
    @Autowired
    private ResponseUtils responseUtils;

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
        if (validation.getResponseMessage() != ResponseEnum.msg200) {
            return genericResponse.matchingResponseMessage(validation);
        }

        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        user.setRoles(Collections.singletonList(_isBoss(userDto.isBoss())));
        userStore.save(user);
        _logger.log("Create user: " + user.getUsername(), LoggerType.INFO);

        return genericResponse.matchingResponseMessage(new GenericResponse<>(user, ResponseEnum.msg200));
    }

    private Role _isBoss(final boolean isBoss) {
        if (isBoss) {
            return roleStore.findByName(BossType.BOSS.getRole());
        } else {
            return roleStore.findByName(BossType.USER.getRole());
        }
    }

    @Override
    public ResponseEntity<?> updateUser(UserDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            GenericResponse<?> validation = userServiceValidation._validateUserUpdates(userDto);
            if (validation.getResponseMessage() != ResponseEnum.msg200) {
                // return http status code base on validate response message
                return genericResponse.matchingResponseMessage(validation);
            }

            User updatedUser = userStore.getUserById(user.getId());
            updatedUser.setUsername(userDto.getUsername());
            updatedUser.setEmail(userDto.getEmail());
            updatedUser.setName(userDto.getName());
            userStore.save(updatedUser);
            _logger.log("Update user: " + userDto.getUsername() + " to: " + updatedUser.getUsername(), LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(updatedUser, ResponseEnum.msg200));
        } catch (Exception e) {
            e.printStackTrace();
            GenericResponse<String> response = responseUtils.returnMessage(
                    String.format("Update User failed: %s ", e.getMessage()), Constants.ResponseMessage.UPDATE_USER,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        }
    }

    @Override
    public ResponseEntity<?> deleteUser(UserDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            GenericResponse<?> validation = userServiceValidation._validateUserDeletion(user);
            if (validation.getResponseMessage() != ResponseEnum.msg200) {
                // return http status code base on validate response message
                return genericResponse.matchingResponseMessage(validation);
            }

            User deleteUser = userStore.getUserById(user.getId());
            userStore.delete(deleteUser);
            _logger.log("Delete user: " + userDto.getUsername(), LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(deleteUser, ResponseEnum.msg200));
        } catch (Exception e) {
            e.printStackTrace();
            GenericResponse<String> response = responseUtils.returnMessage(
                    String.format("Delete User failed: %s ", e.getMessage()), Constants.ResponseMessage.DELETE_USER,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        }
    }

    @Override
    @Cacheable(value = "users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userStore.findAll();
            // List<UserResponse> userResponses = modelMapperConfig._mapperEntityToDto(users);
            _logger.log("Get all users", LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(users, ResponseEnum.msg200));
        } catch (Exception e) {
            e.printStackTrace();
            GenericResponse<String> response = responseUtils.returnMessage(
                    String.format("Get all users failed: %s ", e.getMessage()), Constants.ResponseMessage.GET_ALL_USERS,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
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
    public ResponseEntity<?> getUserByUsername(UserDto userDto) {
        try {
            String username = userDto.getUsername();
            User user = userStore.findByUsername(username);
            _logger.log("Get user: " + user.getUsername(), LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(user, ResponseEnum.msg200));
        } catch (Exception e) {
            e.printStackTrace();
            GenericResponse<String> response = responseUtils.returnMessage(
                    String.format("Get user failed: %s ", e.getMessage()), Constants.ResponseMessage.USER_NOT_FOUND,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
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
