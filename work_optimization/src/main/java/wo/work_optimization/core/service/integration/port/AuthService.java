package wo.work_optimization.core.service.integration.port;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;
import wo.work_optimization.infrastructure.client.adapter.AuthServiceAdapter;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final AuthServiceAdapter authServiceAdapter;

    public UserSettingResponseDTO getUserSetting(Long userId) {
        UserSettingResponseDTO userSetting = authServiceAdapter.getUserSetting(userId);
        log.info("Get User setting from auth service: {}", userSetting);
        return userSetting;
    }

}
