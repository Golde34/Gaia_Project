package auth.authentication_service.services.interfaces;

import org.springframework.http.ResponseEntity;

import auth.authentication_service.modules.dto.TokenDto;

public interface AuthService{
    public ResponseEntity<String> authenticated(String username, String password) throws Exception;
    public ResponseEntity<String> checkToken(TokenDto token) throws Exception;
}
