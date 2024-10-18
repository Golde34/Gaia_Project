package auth.authentication_service.core.port.store;

import auth.authentication_service.core.domain.entities.UserSetting;

public interface UserSettingStore {
    UserSetting getUserSetting(Long userId);
    UserSetting updateUserSetting(UserSetting userSetting);
}
