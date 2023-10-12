package auth.authentication_service.services.interfaces;

import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.validations.EmailExistsException;

import java.util.List;

public interface UserService {
    public User createUser(UserDto userDto) throws EmailExistsException;
    public User updateUser(UserDto userDto);
    public void deleteUser(UserDto userDto);
    public List<User> getAllUsers();
    public User getUserById(UserDto userDto);
    public User getUserByUsername(String username);
    public User getUserByEmail(String email);

}