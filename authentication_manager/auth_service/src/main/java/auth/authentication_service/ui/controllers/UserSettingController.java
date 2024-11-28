package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.dto.request.UpdateUserSetting;
import auth.authentication_service.core.services.interfaces.UserSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-setting")
@RequiredArgsConstructor
public class UserSettingController {
    private final UserSettingService userSettingService;

    @PutMapping("/update")
    public ResponseEntity<?> updateUserSetting(@RequestBody UpdateUserSetting updateUserSetting) {
        return userSettingService.updateUserSettings(updateUserSetting.getUserId(), updateUserSetting.getUserSetting());
    }    

    @GetMapping("/get-by-user")
    public ResponseEntity<?> getUserSetting(@RequestParam Long userId) {
        return userSettingService.getUserSettings(userId);
    }
}
