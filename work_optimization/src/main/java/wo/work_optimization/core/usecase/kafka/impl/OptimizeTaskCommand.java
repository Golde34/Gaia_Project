package wo.work_optimization.core.usecase.kafka.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRequestDTO;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.domain.enums.AutoOptimizeConfigEnum;
import wo.work_optimization.core.domain.enums.OptimizedTaskConfigEnum;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskRegistrationStore;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleConnector;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleFactory;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyConnector;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyFactory;
import wo.work_optimization.core.service.integration.AuthService;
import wo.work_optimization.core.service.integration.TaskService;
import wo.work_optimization.core.usecase.kafka.CommandService;
import wo.work_optimization.core.validation.TaskValidation;
import wo.work_optimization.kernel.utils.DataUtils;
import wo.work_optimization.kernel.utils.DateTimeUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptimizeTaskCommand extends CommandService<OptimizeTaskRequestDTO, String> {

    private final ScheduleFactory scheduleFactory;
    private final StrategyFactory strategyFactory;

    private final TaskService taskService;
    private final TaskMapper taskMapper;
    private final TaskValidation taskValidation;
    private final TaskRegistrationStore taskRegistrationStore;

    private final AuthService authService;

    @Override
    public String command() {
        return TopicConstants.OptimizeCommand.OPTIMIZE_CREATING_TASK;
    }

    @Override
    public OptimizeTaskRequestDTO mapKafkaObject(Object kafkaObjectDto) {
        OptimizeTaskRequestDTO optimizeTask = taskMapper.toOptimizeTaskRequestDTO(kafkaObjectDto);
        log.info("OptimizeTaskCommand mapKafkaObject: {}", optimizeTask.toString());
        return optimizeTask;
    }

    @Override
    public void validateRequest(OptimizeTaskRequestDTO request) {
        if (DataUtils.isNullOrEmpty(request.getTaskId())) {
            log.error("Original Task Id is null. Check why?");
            throw new IllegalArgumentException("Original Task Id is null.");
        }
        if (DataUtils.isNullOrEmpty(request.getWorkOptimTaskId())) {
            log.error("WorkOptim Task Id is null. Check why?");
            throw new IllegalArgumentException("Workoptim Id is null.");
        }
        if (DataUtils.isNullOrEmpty(request.getScheduleTaskId())) {
            log.error("Schedule Task Id is null. Check why?");
            throw new IllegalArgumentException("Schedule Task Id is null.");
        }
        if (ValidateConstants.FAIL == taskValidation.validateOptimTaskRequest(request)) {
            log.error("Validate fail by object existed!");
            throw new IllegalArgumentException("Validate fail by object existed!");
        }
        log.info("OptimizeTaskCommand validateRequest: {}", request.toString());
    }

    @Override
    public String doCommand(OptimizeTaskRequestDTO request) {
        if (!validateExistedTask(request)) {
            return "Task not found";
        }
        
        TaskRegistration taskRegistration = getTaskRegistration(request.getWorkOptimTaskId());
        if (DataUtils.isNullOrEmpty(taskRegistration)) {
            return "Task Registration not found";
        }
        long userId = taskRegistration.getUserId(); 
        
        UserSettingResponseDTO userSetting = authService.getUserSetting(userId);
        if (DataUtils.isNullOrEmpty(userSetting)) {
            log.error("User Setting with id {} not found", userId);
            return "User Setting not found";
        }

        if (AutoOptimizeConfigEnum.DISABLE_AUTO_OPTIMIZE.getValue().equals(userSetting.getAutoOptimizeConfig())) {
            log.warn("For user {} auto optimize is disabled", userId);
            return "Auto optimize is disabled";
        }

        // Optimize task
        OptimizeTaskRestRequestDTO req = OptimizeTaskRestRequestDTO.builder().userId(userId)
                .optimizedDate(DateTimeUtils.currentDateTime()).build();
        String strategy = OptimizedTaskConfigEnum.of(userSetting.getTaskSortingAlgorithm()).getMode();
        StrategyConnector strategyConnector = strategyFactory.get(strategy);
        List<Task> listTasks = strategyConnector.handleStrategy(req);

        // Optimize Task by Schedule Factory
        if (listTasks.isEmpty()) {
            log.error("No task found");
            return "No task found";
        }
        String method = OptimizedTaskConfigEnum.of(userSetting.getOptimizedTaskConfig()).getMode();
        ScheduleConnector scheduleConnector = scheduleFactory.get(method);
        scheduleConnector.schedule(listTasks, userId);
        log.info("Optimize Task By User: {}", listTasks);

        return "OptimizeTaskCommand doCommand";
    }

    private boolean validateExistedTask(OptimizeTaskRequestDTO request) {
        Task task = taskService.getTask(request);
        if (DataUtils.isNullOrEmpty(task)) {
            log.error("There is no need to optimize task which is not existed - Task Id: {}", request.getTaskId());
            return false;
        }
        return true;
    }

    private TaskRegistration getTaskRegistration(String optimizedTaskId) {
        Optional<TaskRegistration> taskRegistration = taskRegistrationStore.getTaskRegistrationByTaskId(optimizedTaskId);
        if (DataUtils.isNullOrEmpty(taskRegistration)) {
            log.error("Task Registration with id {} not found", optimizedTaskId);
            return null;
        }
        return taskRegistration.get();
    }

}