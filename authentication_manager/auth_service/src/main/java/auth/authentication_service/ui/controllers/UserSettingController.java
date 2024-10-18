package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.entities.UserSetting;
import auth.authentication_service.core.services.interfaces.UserSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-setting")
@RequiredArgsConstructor
public class UserSettingController {
    private UserSettingService userSettingService;

    @PostMapping("/add-user-setting")
    public ResponseEntity<?> createUserSetting(@RequestBody UserSetting userSetting) {
        return userSettingService.updateUserSettings(userSetting);
    }

    @GetMapping("/get-user-setting")
    public ResponseEntity<?> getUserSetting(@RequestParam Long userId) {
        return userSettingService.getUserSettings(userId);
    }
}
