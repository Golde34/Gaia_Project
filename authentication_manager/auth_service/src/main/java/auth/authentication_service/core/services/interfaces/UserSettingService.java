package auth.authentication_service.core.services.interfaces;

import auth.authentication_service.core.domain.entities.UserSetting;

import org.springframework.http.ResponseEntity;

public interface UserSettingService {
    ResponseEntity<?> updateUserSettings(UserSetting userSetting);
    ResponseEntity<?> getUserSettings(Long userId); 
}
