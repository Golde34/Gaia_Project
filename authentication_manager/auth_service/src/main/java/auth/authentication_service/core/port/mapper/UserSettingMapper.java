package auth.authentication_service.core.port.mapper;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import auth.authentication_service.core.domain.dto.request.UpdateUserSettingRequest;
import auth.authentication_service.core.domain.entities.UserSetting;

@Component
public class UserSettingMapper {
    public UserSetting updateUserSettingMapper(UpdateUserSettingRequest request, UserSetting userSetting) {
        userSetting.setOptimizedTaskConfig(request.getOptimizedTaskConfig());
        userSetting.setPrivateProfileConfig(request.getPrivateProfileConfig());
        userSetting.setTaskSortingAlgorithm(request.getTaskSortingAlgorithm());
        userSetting.setAutoOptimizeConfig(request.getAutoOptimizeConfig());
        userSetting.setUpdatedDate(Timestamp.valueOf(LocalDateTime.now()));
        return userSetting;
    }
}
