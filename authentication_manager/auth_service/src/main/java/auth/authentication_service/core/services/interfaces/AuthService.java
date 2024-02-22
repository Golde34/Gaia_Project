package auth.authentication_service.core.services.interfaces;

import org.springframework.http.ResponseEntity;

import auth.authentication_service.core.domain.dto.TokenDto;
import auth.authentication_service.core.domain.dto.UserPermissionDto;

public interface AuthService{
    public ResponseEntity<?> authenticated(String username, String password) throws Exception;
    public ResponseEntity<?> gaiaAutoSignin(String username, String password) throws Exception;
    public ResponseEntity<?> checkToken(TokenDto token) throws Exception;
    public ResponseEntity<?> checkPermission(UserPermissionDto permission) throws Exception;
    public ResponseEntity<?> checkStatus();
}
