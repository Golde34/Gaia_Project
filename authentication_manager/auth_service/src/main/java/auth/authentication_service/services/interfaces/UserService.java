package auth.authentication_service.services.interfaces;

import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    public ResponseEntity<?> createUser(RegisterDto userDto);
    public ResponseEntity<?> updateUser(UserDto userDto);
    public ResponseEntity<?> deleteUser(UserDto userDto);
    public List<User> getAllUsers();
    public User getUserByUsername(String username);
    public User getUserByEmail(String email);
    public User getUserById(Long id);
}