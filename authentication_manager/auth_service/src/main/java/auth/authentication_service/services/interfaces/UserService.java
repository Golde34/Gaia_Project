package auth.authentication_service.services.interfaces;

import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.validations.EmailExistsException;

import java.util.List;

public interface UserService {
    public User createUser(RegisterDto userDto) throws EmailExistsException;
    public User updateUser(RegisterDto userDto);
    public void deleteUser(RegisterDto userDto);
    public List<User> getAllUsers();
    public User getUserById(RegisterDto userDto);
    public User getUserByUsername(String username);
    public User getUserByEmail(String email);

}