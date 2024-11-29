package wo.work_optimization.core.service.factory.option;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;
import wo.work_optimization.core.domain.enums.AutoOptimizeConfigEnum;
import wo.work_optimization.core.service.factory.option.connector.OptionService;
import wo.work_optimization.core.service.integration.port.AuthService;

@Service
@RequiredArgsConstructor
@Slf4j
public class FixedTimeOption extends OptionService {

    private final AuthService authService;

    @Override
    public String option() {
        return "fixed_time";
    }

    @Override
    public boolean doOption(long userId) {
        // Tiến trình quét check nếu trạng thái autoOptimConfig = 2 thì mới đi optimize task
        UserSettingResponseDTO userSettingResponseDTO = authService.getUserSetting(userId);
        int fixedTime = userSettingResponseDTO.getAutoOptimizeConfig();
        return AutoOptimizeConfigEnum.OPTIMIZE_IN_FIXED_TIME.getValue() == fixedTime;
    }
}
