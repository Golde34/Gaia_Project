package auth.authentication_service.services.interfaces;

import org.springframework.http.ResponseEntity;

import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserPermissionDto;

public interface AuthService{
    public ResponseEntity<?> authenticated(String username, String password) throws Exception;
    public ResponseEntity<?> checkToken(TokenDto token) throws Exception;
    public ResponseEntity<?> checkPermission(UserPermissionDto permission) throws Exception;
}
