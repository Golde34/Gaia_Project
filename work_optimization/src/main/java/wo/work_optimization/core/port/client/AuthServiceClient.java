package wo.work_optimization.core.port.client;

import wo.work_optimization.core.domain.dto.response.UserResponseDTO;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;

public interface AuthServiceClient {
    UserResponseDTO getExistedUser(Long userId);
    UserSettingResponseDTO getUserSetting(Long userId);
}
