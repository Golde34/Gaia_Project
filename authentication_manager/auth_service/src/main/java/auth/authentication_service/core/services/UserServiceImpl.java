package auth.authentication_service.core.services;

import auth.authentication_service.core.domain.constant.Constants;
import auth.authentication_service.core.domain.dto.RegisterDto;
import auth.authentication_service.core.domain.dto.UserDto;
import auth.authentication_service.core.domain.dto.request.UpdateUserRequest;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.domain.entities.User;
import auth.authentication_service.core.domain.enums.BossType;
import auth.authentication_service.core.domain.enums.LoggerType;
import auth.authentication_service.core.domain.enums.ResponseEnum;
import auth.authentication_service.core.port.mapper.UserMapper;
import auth.authentication_service.core.port.store.RoleStore;
import auth.authentication_service.core.port.store.UserCRUDStore;
import auth.authentication_service.core.services.interfaces.UserService;
import auth.authentication_service.core.validations.service_validations.UserServiceValidation;
import auth.authentication_service.kernel.utils.*;
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
    private GenericResponse<?> genericResponse;
    @Autowired
    private ResponseUtils responseUtils;

    @Autowired
    UserServiceValidation userServiceValidation;
    @Autowired
    UserMapper userMapper;

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
    public ResponseEntity<?> updateUser(UpdateUserRequest userDto) {
        try {
            GenericResponse<?> validation = userServiceValidation._validateUserUpdates(userDto);
            log.info("UserDTO: {}", userDto);
            if (validation.getResponseMessage() != ResponseEnum.msg200) {
                return genericResponse.matchingResponseMessage(validation);
            }

            User user = userStore.getUserById(userDto.getUserId());
            _logger.log("Update user: " + user.getUsername() + " to: " + userDto.getUsername(), LoggerType.INFO);
            updateUserRoles(userDto, user);
            user = userMapper.updateUserMapper(userDto, user);
            userStore.save(user);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(user, ResponseEnum.msg200));
        } catch (Exception e) {
            GenericResponse<String> response = responseUtils.returnMessage(
                    "Update User failed: %s ".formatted(e.getMessage()), Constants.ResponseMessage.UPDATE_USER,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        }
    }

    private void updateUserRoles(UpdateUserRequest userDto, User user) {
        user.getRoles().clear();
        userDto.getRoles().forEach(roleName -> {
            Role role = roleStore.findByName(roleName);
            user.getRoles().add(role);
        });
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
            GenericResponse<String> response = responseUtils.returnMessage(
                    "Delete User failed: %s ".formatted(e.getMessage()), Constants.ResponseMessage.DELETE_USER,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        }
    }

    @Override
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userStore.findAll();
            // List<UserResponse> userResponses =
            // modelMapperConfig._mapperEntityToDto(users);
            _logger.log("Get all users", LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(users, ResponseEnum.msg200));
        } catch (Exception e) {
            GenericResponse<String> response = responseUtils.returnMessage(
                    "Get all users failed: %s ".formatted(e.getMessage()), Constants.ResponseMessage.GET_ALL_USERS,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        }
    }

    @Override
    @Cacheable(value = "userById", key = "#id", cacheManager = "cacheManager")
    public User getUserById(Long id, String usedClass) {
        try {
            User user = userStore.getUserById(id);
            log.info("Get user: {} from: {}", user.getUsername(), usedClass);
            return user;
        } catch (Exception e) {
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
            GenericResponse<String> response = responseUtils.returnMessage(
                    "Get user failed: %s ".formatted(e.getMessage()), Constants.ResponseMessage.USER_NOT_FOUND,
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
            _logger.log("Get user: " + email + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    @Cacheable(value = "userResponseById", key = "#id", cacheManager = "cacheManager")
    public ResponseEntity<?> getUserResponseById(Long id) {
        try {
            User user = getUserById(id, "Get User Response");
            log.info("User response: {}", user.toString());
            return genericResponse.matchingResponseMessage(new GenericResponse<>(user, ResponseEnum.msg200));
        } catch (Exception e) {
            GenericResponse<String> response = responseUtils.returnMessage(
                    "Get user failed: %s ".formatted(e.getMessage()), Constants.ResponseMessage.USER_NOT_FOUND,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        } 
    }
}
