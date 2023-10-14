package auth.authentication_service.services.interfaces;

import org.springframework.http.ResponseEntity;

public interface AuthService{
    public ResponseEntity<String> authenticated(String username, String password) throws Exception;
}
