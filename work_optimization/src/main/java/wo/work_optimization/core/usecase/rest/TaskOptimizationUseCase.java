package wo.work_optimization.core.usecase.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.enums.OptimizedTaskConfigEnum;
import wo.work_optimization.core.domain.enums.ResponseMessage;
import wo.work_optimization.core.domain.enums.TaskSortingAlgorithmEnum;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleConnector;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleFactory;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyConnector;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyFactory;
import wo.work_optimization.core.service.integration.AuthService;
import wo.work_optimization.kernel.utils.GenericResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskOptimizationUseCase {

    private final ScheduleFactory scheduleFactory;
    private final StrategyFactory strategyFactory;
    private final AuthService authService;

    private final GenericResponse<?> genericResponse;

    public GeneralResponse<?> optimizeTaskByUser(OptimizeTaskRestRequestDTO request) {
        try {
            // Call auth service to get user settings
            UserSettingResponseDTO userSettingResponseDTO = authService.getUserSetting(request.getUserId());
            // Get Task Strategy
            String strategy = OptimizedTaskConfigEnum.of(userSettingResponseDTO.getOptimizedTaskConfig()).getMode();
            StrategyConnector strategyConnector = strategyFactory.get(strategy);
            List<Task> listTasks = strategyConnector.handleStrategy(request);

            // Optimize Task by Schedule Factory
            if (listTasks.isEmpty()) {
                return genericResponse
                        .matchingResponseMessage(new GenericResponse<>("No task found", ResponseMessage.msg400));
            }
            String method = TaskSortingAlgorithmEnum.of(userSettingResponseDTO.getTaskSortingAlgorithm()).getMethod();
            ScheduleConnector scheduleConnector = scheduleFactory.get(method);
            Map<Integer, String> result = scheduleConnector.schedule(listTasks, request.getUserId());
            if (result.isEmpty()) {
                return genericResponse
                        .matchingResponseMessage(new GenericResponse<>("No task to optimize", ResponseMessage.msg400));
            }
            result.entrySet().stream().forEach(r -> {
                if (Constants.ErrorStatus.FAIL.equals(r.getValue())) {
                    log.error("Error when execute tasks batch {}, convert taskOrder equals -1. Optimize the next time!",
                            r.getKey());
                }
            });
            log.info("Optimize Task By User: {}", result);
            List<Task> savedTasks = strategyConnector.returnTasks(request);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(savedTasks, ResponseMessage.msg200));
        } catch (Exception e) {
            log.error("Error when optimize task by user: {}", e.getMessage());
            return genericResponse
                    .matchingResponseMessage(new GenericResponse<>(e.getMessage(), ResponseMessage.msg500));
        }
    }
}
