package auth.authentication_service.modules.controllers;

import auth.authentication_service.modules.dto.LoginDto;
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

    @RequestMapping (value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginDto accountDto) throws Exception {
        String jwtResponse = tokenService.authenticated(accountDto.getUsername(), accountDto.getPassword());
        return ResponseEntity.ok(new TokenDto(jwtResponse));
    }

//    @RequestMapping("/regenerateAccessToken", method = RequestMethod.GET)
//    public ResponseEntity<?> regenerateAccessToken(@RequestBody TokenDto tokenDto) throws Exception {
//        String jwtReponse = tokenService.regenerateToken(tokenDto.getToken(), TokenType.ACCESS_TOKEN);
//        return ResponseEntity.ok(new TokenDto(jwtReponse));
//    }
}
