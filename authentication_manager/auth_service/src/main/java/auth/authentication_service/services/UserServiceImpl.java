package auth.authentication_service.services;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.RoleRepository;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.utils.BCryptPasswordEncoder;
import auth.authentication_service.utils.LoggerUtils;
import auth.authentication_service.utils.ModelMapperConfig;
import auth.authentication_service.validations.EmailExistsException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private LoggerUtils _logger;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapperConfig modelMapperConfig;

    @Override
    public User createUser(RegisterDto userDto) throws EmailExistsException {
        if (_emailExist(userDto.getEmail())) {
            throw new EmailExistsException("There is an account with that email address: " + userDto.getEmail());
        }
        User user = modelMapperConfig.modelMapper().map(userDto, User.class);
        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        user.setRoles(Collections.singletonList(_isBoss(userDto.isBoss())));
        _logger.log("Create user: " + user.getUsername(), LoggerType.INFO);
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
    public User updateUser(RegisterDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            if (_checkExistUser(user.getId())){
                userRepository.save(user);
                _logger.log("Update user: " + user.getUsername(), LoggerType.INFO);
            }
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Update user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
            return null;
        }
    }

    @Override
    public void deleteUser(RegisterDto userDto) {
        try {
            User user = modelMapperConfig._mapperDtoToEntity(userDto);
            if (_checkExistUser(user.getId())){
                userRepository.delete(user);
                _logger.log("Delete user: " + user.getUsername(), LoggerType.INFO);
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Delete user: " + userDto.getUsername() + " failed", LoggerType.ERROR);
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
            if (_checkExistUser(user.getId())) {
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

    private boolean _checkExistUser(Long id) {
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
