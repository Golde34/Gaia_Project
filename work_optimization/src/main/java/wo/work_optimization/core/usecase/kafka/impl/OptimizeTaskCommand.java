package wo.work_optimization.core.usecase.kafka.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.UserSettingResponseDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskRegistrationStore;
import wo.work_optimization.core.service.integration.AuthService;
import wo.work_optimization.core.service.integration.TaskService;
import wo.work_optimization.core.usecase.kafka.CommandService;
import wo.work_optimization.core.validation.TaskValidation;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptimizeTaskCommand extends CommandService<OptimizeTaskRequestDTO, String> {

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
        // Get task by task id, workoptim id, scheduletask id from database
        Task task = taskService.getTask(request);
        if (DataUtils.isNullOrEmpty(task)) {
            log.error("Task with id {} not found", request.getTaskId());
        }
        // Get Task Registration Config
        Optional<TaskRegistration> taskRegistration = taskRegistrationStore.getTaskRegistrationByTaskId(request.getWorkOptimTaskId());
        if (DataUtils.isNullOrEmpty(taskRegistration)) {
            log.error("Task Registration with id {} not found", request.getWorkOptimTaskId());
        }
        // Call auth service to get user settings
        UserSettingResponseDTO userSetting = authService.getUserSetting(taskRegistration.get().getUserId()); 
        if (DataUtils.isNullOrEmpty(userSetting)) {
            log.error("User Setting with id {} not found", taskRegistration.get().getUserId());
        }
        // Optimize task
        return "OptimizeTaskCommand doCommand";
    }
}
