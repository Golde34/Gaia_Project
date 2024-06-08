package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.dto.TokenDto;
import auth.authentication_service.core.domain.dto.UserPermissionDto;
import auth.authentication_service.core.domain.dto.request.SignInDtoRequest;
import auth.authentication_service.core.domain.enums.ResponseEnum;
import auth.authentication_service.core.services.interfaces.AuthService;
import auth.authentication_service.kernel.utils.GenericResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private GenericResponse<String> genericResponse;

    @GetMapping("/")
    public ResponseEntity<?> home() {
        return ResponseEntity.ok("<h1>This application belong to Golde.</h1>");
    }

    @GetMapping("/user")
    public ResponseEntity<?> user() {
        return ResponseEntity.ok("<h1>Test user role.</h1>");
    }

    @GetMapping("/admin")
    public ResponseEntity<?> admin() {
        return ResponseEntity.ok("<h1>Test admin role.</h1>");
    }

    @GetMapping("/status")
    public ResponseEntity<?> status() {
        return genericResponse.matchingResponseMessage(new GenericResponse<>("4001", ResponseEnum.msg200));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInDtoRequest accountDto) throws Exception {
        return authService.authenticated(accountDto.getUsername(), accountDto.getPassword());
    }

    @PostMapping("/gaia-auto-sign-in")
    public ResponseEntity<?> gaiaAutoSignIn(@RequestBody SignInDtoRequest accountDto) throws Exception {
        return authService.gaiaAutoSignin(accountDto.getUsername(), accountDto.getPassword());
    }

    @GetMapping("/check-token")
    public ResponseEntity<?> checkToken(@RequestBody TokenDto token) throws Exception {
        return authService.checkToken(token);
    }

    @GetMapping("/check-permission")
    public ResponseEntity<?> checkPermission(@RequestBody UserPermissionDto permission) throws Exception {
        return authService.checkPermission(permission);
    }

    // @RequestMapping("/regenerateAccessToken", method = RequestMethod.GET)
    // public ResponseEntity<?> regenerateAccessToken(@RequestBody TokenDto
    // tokenDto) throws Exception {
    // String jwtReponse = tokenService.regenerateToken(tokenDto.getToken(),
    // TokenType.ACCESS_TOKEN);
    // return ResponseEntity.ok(new TokenDto(jwtReponse));
    // }
}
