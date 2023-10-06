package auth.authentication_service.modules.controllers;

import auth.authentication_service.modules.dto.AccountDto;
import auth.authentication_service.modules.dto.TokenDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.securities.UserDetailsServices;
import auth.authentication_service.utils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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

//    @GetMapping("/")
//    public String home() {
//        return "<h1>This authentication service was created by master Dong Viet </h1>";
//    }
//
//    @GetMapping("/user")
//    public String user() {
//        return "<h1>Test user role.</h1>";
//    }
//
//    @GetMapping("/admin")
//    public String admin() {
//        return "<h1>Test admin role.</h1>";
//    }

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

//    @PostMapping("/register")
//    public ResponseEntity<?> registerAccount(@RequestBody UserDto userDto) throws Exception {
//        return ResponseEntity.ok(userDetailService.save(userDto));
//    }
}
