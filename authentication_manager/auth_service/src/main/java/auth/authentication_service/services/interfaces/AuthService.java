package auth.authentication_service.services.interfaces;

import org.springframework.http.ResponseEntity;

import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserPermissionDto;

public interface AuthService{
    public ResponseEntity<String> authenticated(String username, String password) throws Exception;
    public ResponseEntity<String> checkToken(TokenDto token) throws Exception;
    public ResponseEntity<String> checkPermission(UserPermissionDto permission) throws Exception;
}
