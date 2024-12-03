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
import wo.work_optimization.core.service.integration.port.AuthService;
import wo.work_optimization.core.service.integration.port.NotificationService;
import wo.work_optimization.core.service.integration.port.SchedulePlanService;
import wo.work_optimization.kernel.utils.GenericResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskOptimizationUseCase {

    private final ScheduleFactory scheduleFactory;
    private final StrategyFactory strategyFactory;

    private final AuthService authService;
    private final NotificationService notificationService;
    private final SchedulePlanService schedulePlanService;

    private final GenericResponse<?> genericResponse;

    public GeneralResponse<?> optimizeTaskByUser(OptimizeTaskRestRequestDTO request) {
        try {
            // Call auth service to get user settings
            UserSettingResponseDTO userSettingResponseDTO = authService.getUserSetting(request.getUserId());

            // Get Task Strategy
            String strategy = OptimizedTaskConfigEnum.of(userSettingResponseDTO.getOptimizedTaskConfig()).getMode();
            StrategyConnector strategyConnector = strategyFactory.get(strategy);
            List<Task> listTasks = strategyConnector.handleStrategy(request);
            if (listTasks.isEmpty()) {
                return genericResponse
                        .matchingResponseMessage(new GenericResponse<>("No task found", ResponseMessage.msg400));
            }

            // Optimize Task by Schedule Factory
            String method = TaskSortingAlgorithmEnum.of(userSettingResponseDTO.getTaskSortingAlgorithm()).getMethod();
            ScheduleConnector scheduleConnector = scheduleFactory.get(method);
            Map<Integer, String> result = scheduleConnector.schedule(listTasks, request.getUserId());
            if (result.isEmpty()) {
                return genericResponse
                        .matchingResponseMessage(new GenericResponse<>("No task to optimize", ResponseMessage.msg400));
            }
            log.info("Optimize Task By User: {}", result);

            String optimizeStatus = getFinalOptimizeTaskStatus(result);

            // Push to notification service
            String statusPush = notificationService.sendOptimizeNotification(request.getUserId(), optimizeStatus);
            log.info(statusPush);

            List<Task> savedTasks = strategyConnector.returnTasks(request);

            // Push to schedule plan
            schedulePlanService.pushOptimizeResult(request.getUserId(), savedTasks);

            return genericResponse.matchingResponseMessage(new GenericResponse<>(savedTasks, ResponseMessage.msg200));
        } catch (Exception e) {
            log.error("Error when optimize task by user: {}", e.getMessage());
            return genericResponse
                    .matchingResponseMessage(new GenericResponse<>(e.getMessage(), ResponseMessage.msg500));
        }
    }

    private String getFinalOptimizeTaskStatus(Map<Integer, String> results) {
        String optimizeStatus = Constants.ErrorStatus.SUCCESS;
        for (Map.Entry<Integer, String> entry : results.entrySet()) {
            if (Constants.ErrorStatus.FAIL.equals(entry.getValue())) {
                log.error("Error when execute tasks batch {}, convert taskOrder equals -1. Optimize the next time!",
                        entry.getKey());
                optimizeStatus = Constants.ErrorStatus.FAIL;
                break;
            }
        }
        return optimizeStatus;
    }
}
