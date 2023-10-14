package auth.authentication_service.services.interfaces;

import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    public ResponseEntity<String> createUser(RegisterDto userDto);
    public ResponseEntity<String> updateUser(UserDto userDto);
    public ResponseEntity<String> deleteUser(UserDto userDto);
    public List<User> getAllUsers();
    public User getUserById(RegisterDto userDto);
    public User getUserByUsername(String username);
    public User getUserByEmail(String email);

}