package wo.work_optimization.core.usecase.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.domain.enums.OptimizedTaskConfigEnum;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleFactory;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyConnector;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyFactory;
import wo.work_optimization.core.service.integration.AuthService;
import wo.work_optimization.core.service.integration.TaskRegistrationService;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskOptimizationUseCase {
    
    private final ScheduleFactory scheduleFactory;
    private final StrategyFactory strategyFactory;
    private final TaskRegistrationService taskRegistrationService;
    private final AuthService authService;

    public ResponseEntity<GeneralResponse<String>> optimizeTaskByUser(OptimizeTaskRestRequestDTO request) {
        // Get Task Registration By User Id
        TaskRegistration taskRegistration = taskRegistrationService.getTaskRegistrationByUserId(request.getUserId());
        // Call auth service to get user settings
        UserSettingResponseDTO userSettingResponseDTO = authService.getUserSetting(request.getUserId());
        // Get Task Strategy
        String strategy = OptimizedTaskConfigEnum.of(userSettingResponseDTO.getOptimizedTaskConfig()).getMode();
        StrategyConnector strategyConnector = strategyFactory.get(strategy);
        List<Task> listTasks = strategyConnector.handleStrategy(request);

        // Optimize Task by Schedule Factory
        // String method = TaskSortingAlgorithmEnum.of(userSettingResponseDTO.getTaskSortingAlgorithm()).getMethod();
        // ScheduleConnector scheduleConnector = scheduleFactory.get(method);
        // ResponseEntity<GeneralResponse<TaskResponseDTO>> result = scheduleConnector.schedule(taskRequestDTO);
        // log.info("Optimize Task By User: {}", result.getBody().getData().toString());
        return ResponseEntity.ok(GeneralResponse.<String>builder()
            .status("SUCCESS")
            .statusMessage("Optimize Task By User")
            .data("Optimize Task By User")
            .build());
    }


}
