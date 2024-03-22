package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.dto.RegisterDto;
import auth.authentication_service.core.domain.dto.UserDto;
import auth.authentication_service.core.domain.entities.User;
import auth.authentication_service.core.services.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value = "/create-user", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody RegisterDto userDto) {
        ResponseEntity<?> user = userService.createUser(userDto);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/update-user", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        ResponseEntity<?> user = userService.updateUser(userDto);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/delete-user", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@RequestBody UserDto userDto){
        ResponseEntity<?> user = userService.deleteUser(userDto);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/get-all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @RequestMapping(value = "/get-user")
    public ResponseEntity<User> getUser(@RequestBody UserDto userDto) {
        User user = userService.getUserByUsername(userDto.getUsername());
        return ResponseEntity.ok(user);
    }
}
