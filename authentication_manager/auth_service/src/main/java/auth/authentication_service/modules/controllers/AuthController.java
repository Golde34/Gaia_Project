package auth.authentication_service.modules.controllers;

import auth.authentication_service.modules.dto.AccountDto;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.services.interfaces.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService tokenService;

   @GetMapping("/")
   public ResponseEntity<?> home() {
       return ResponseEntity.ok("<h1>This authentication service was created by master Dong Viet </h1>");
   }

   @GetMapping("/user")
   public ResponseEntity<?> user() {
       return ResponseEntity.ok("<h1>Test user role.</h1>");
   }

   @GetMapping("/admin")
   public ResponseEntity<?> admin() {
       return ResponseEntity.ok("<h1>Test admin role.</h1>");
   }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AccountDto accountDto) throws Exception {
        String jwtReponse = tokenService.authenticated(accountDto.getUsername(), accountDto.getPassword());
        return ResponseEntity.ok(new TokenDto(jwtReponse));
    }
}
