package auth.authentication_service.core.services.interfaces;

import auth.authentication_service.core.domain.dto.RegisterDto;
import auth.authentication_service.core.domain.dto.UserDto;
import auth.authentication_service.core.domain.dto.request.UpdateUserRequest;
import auth.authentication_service.core.domain.entities.User;

import org.springframework.http.ResponseEntity;

public interface UserService {
    public ResponseEntity<?> createUser(RegisterDto userDto);
    public ResponseEntity<?> updateUser(UpdateUserRequest userDto);
    public ResponseEntity<?> deleteUser(UserDto userDto);
    public ResponseEntity<?> getAllUsers();
    public ResponseEntity<?> getUserByUsername(UserDto userDto);
    public User getUserByEmail(String email);
    public User getUserById(Long id);
}