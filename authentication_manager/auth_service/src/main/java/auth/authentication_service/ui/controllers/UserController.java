package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.dto.RegisterDto;
import auth.authentication_service.core.domain.dto.UserDto;
import auth.authentication_service.core.domain.dto.request.UpdateUserRequest;
import auth.authentication_service.core.services.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody RegisterDto userDto) {
        return userService.createUser(userDto);
    }

    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest userDto) {
        return userService.updateUser(userDto);
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<?> deleteUser(@RequestBody UserDto userDto){
        return userService.deleteUser(userDto);
    }

    @RequestMapping(value = "/get-all-users")
    public ResponseEntity<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/get-user")
    public ResponseEntity<?> getUser(@RequestBody UserDto userDto) {
        return userService.getUserByUsername(userDto);
    }
}
