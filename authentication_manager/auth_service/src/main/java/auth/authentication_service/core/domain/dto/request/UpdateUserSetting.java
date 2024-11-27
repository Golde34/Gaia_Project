package auth.authentication_service.core.domain.dto.request;

import auth.authentication_service.core.domain.entities.UserSetting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserSetting {
    private long userId;
    private UserSetting userSetting;
}
