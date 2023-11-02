package auth.authentication_service.modules.controllers;

import auth.authentication_service.modules.dto.SignInDtoRequest;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserPermissionDto;
import auth.authentication_service.services.interfaces.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

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

    @RequestMapping(value = "/status", method = RequestMethod.GET)
    public ResponseEntity<String> status() {
        return ResponseEntity.ok("OK");
    }

    @RequestMapping(value = "/sign-in", method = RequestMethod.POST)
    public ResponseEntity<?> signIn(@RequestBody SignInDtoRequest accountDto) throws Exception {
        return authService.authenticated(accountDto.getUsername(), accountDto.getPassword());
    }

    @RequestMapping(value = "/check-token", method = RequestMethod.GET)
    public ResponseEntity<?> checkToken(@RequestBody TokenDto token) throws Exception {
        return authService.checkToken(token);
    }

    @RequestMapping(value = "/check-permission", method = RequestMethod.GET)
    public ResponseEntity<?> checkPermission(@RequestBody UserPermissionDto permission) throws Exception{
        return authService.checkPermission(permission);
    }

//    @RequestMapping("/regenerateAccessToken", method = RequestMethod.GET)
//    public ResponseEntity<?> regenerateAccessToken(@RequestBody TokenDto tokenDto) throws Exception {
//        String jwtReponse = tokenService.regenerateToken(tokenDto.getToken(), TokenType.ACCESS_TOKEN);
//        return ResponseEntity.ok(new TokenDto(jwtReponse));
//    }
}
