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

    @RequestMapping(value = "/create-user", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody RegisterDto userDto) {
        return userService.createUser(userDto);
    }

    @RequestMapping(value = "/update-user", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest userDto) {
        return userService.updateUser(userDto);
    }

    @RequestMapping(value = "/delete-user", method = RequestMethod.DELETE)
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
