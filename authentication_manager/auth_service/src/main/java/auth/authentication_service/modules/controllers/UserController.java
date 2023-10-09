package auth.authentication_service.modules.controllers;

import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.services.UserServiceImpl;
import auth.authentication_service.validations.EmailExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) throws EmailExistsException {
        User user = userService.createUser(userDto);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    public ResponseEntity<User> updateUser(@RequestBody UserDto userDto) {
        User user = userService.updateUser(userDto);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public ResponseEntity<String> deleteUser(@RequestBody UserDto userDto){
        userService.deleteUser(userDto);
        return ResponseEntity.ok("Delete user successfully");
    }

    @RequestMapping(value = "/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @RequestMapping(value = "/getUser")
    public ResponseEntity<User> getUser(@RequestBody UserDto userDto) {
        User user = userService.getUserById(userDto);
        return ResponseEntity.ok(user);
    }
}
