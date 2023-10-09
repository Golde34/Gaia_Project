package auth.authentication_service.modules.controllers;

import auth.authentication_service.modules.dto.AccountDto;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.securities.UserDetailsServices;
import auth.authentication_service.utils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationConfiguration authenticationManager;
    private final UserDetailsServices userDetailService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationConfiguration authenticationManager, UserDetailsServices userDetailService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.jwtUtil = jwtUtil;
    }

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
        try {
            authenticationManager.getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(accountDto.getUsername(), accountDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailService.loadUserByUsername(accountDto.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new TokenDto(jwt));
    }

    
}
