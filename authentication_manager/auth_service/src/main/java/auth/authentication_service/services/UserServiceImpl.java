package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.RoleRepository;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.utils.BCryptPasswordEncoder;
import auth.authentication_service.utils.ModelMapperConfig;
import auth.authentication_service.validations.EmailExistsException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapperConfig modelMapperConfig;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapperConfig modelMapperConfig) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapperConfig = modelMapperConfig;
    }

    @Override
    public User createUser(UserDto userDto) throws EmailExistsException {
        if (_emailExist(userDto.getEmail())) {
            throw new EmailExistsException("There is an account with that email address: " + userDto.getEmail());
        }
        User user = modelMapperConfig.modelMapper().map(userDto, User.class);
        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        user.setRoles(Collections.singletonList(_isBoss(userDto.isBoss())));

        _logger("Create user: " + user.getUsername(), LoggerType.INFO);

        return userRepository.save(user);
    }
    private boolean _emailExist(final String email) {
        return userRepository.findByEmail(email) != null;
    }
    private Role _isBoss(final boolean isBoss) {
        if (isBoss) {
            return roleRepository.findByName("ROLE_BOSS");
        } else {
            return roleRepository.findByName("ROLE_USER");
        }
    }

    @Override
    public User updateUser(UserDto userDto) {
        try {
            User user = _mapperDtoToEntity(userDto);
            if (_checkExistUser(user.getId())){
                userRepository.save(user);
                _logger("Update user: " + user.getUsername(), LoggerType.INFO);
            }
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Update user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public void deleteUser(UserDto userDto) {
        try {
            User user = _mapperDtoToEntity(userDto);
            if (_checkExistUser(user.getId())){
                userRepository.delete(user);
                _logger("Delete user: " + user.getUsername(), LoggerType.INFO);
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Delete user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
        }
    }

    @Override
    public List<User> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            _logger("Get all users", LoggerType.INFO);
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Get all users failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserById(Long id) {
        try {
            User user = userRepository.findById(id).get();
            _logger("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Get user: " + id + " failed", LoggerType.ERROR);
            return null;
        }
    }

    public User getUserById(UserDto userDto) {
        try {
            User user = _mapperDtoToEntity(userDto);
            if (_checkExistUser(user.getId())) {
                _logger("Get user: " + user.getUsername(), LoggerType.INFO);
            }
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Get user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserByUsername(String username) {
        try {
            User user = userRepository.findByUsername(username);
            _logger("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Get user: " + username + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public User getUserByEmail(String email) {
        try {
            User user = userRepository.findByEmail(email);
            _logger("Get user: " + user.getUsername(), LoggerType.INFO);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Get user: " + email + " failed", LoggerType.ERROR);
            return null;
        }
    }

    private boolean _checkExistUser(Long id) {
        try {
            for (User user : userRepository.findAll()) {
                if (Objects.equals(user.getId(), id)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Check exist user: " + id + " failed", LoggerType.ERROR);
        }
        return false;
    }
    private void _logger(String message, LoggerType loggerType) {
        if (loggerType == LoggerType.ERROR) { logger.error(message);}
        if (loggerType == LoggerType.INFO) { logger.info(message);}
        if (loggerType == LoggerType.DEBUG) { logger.debug(message);}
        if (loggerType == LoggerType.TRACE) { logger.trace(message);}
        if (loggerType == LoggerType.WARN) { logger.warn(message);}
    }
    // private UserDto _mapperEntityToDto(User user) {
    //     return modelMapperConfig.modelMapper().map(user, UserDto.class);
    // }
    private User _mapperDtoToEntity(UserDto userDto) {
        return modelMapperConfig.modelMapper().map(userDto, User.class);
    }
}
