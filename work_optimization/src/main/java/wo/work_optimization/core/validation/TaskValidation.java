package wo.work_optimization.core.validation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateScheduleTaskRequestDTO;
import wo.work_optimization.core.domain.dto.request.CreateTaskRequestDTO;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRequestDTO;
import wo.work_optimization.core.port.store.TaskStore;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskValidation {

    private final TaskStore taskStore;

    public boolean validateCreateTaskRequest(CreateTaskRequestDTO request) {
        if (request.getTask().getId().equals(request.getTaskId())) {
            log.error("Validate create task command failed with task id: {}, userId: {}, project: {}, groupTask: {}",
                    request.getTaskId(), request.getUserId(), request.getProject(), request.getGroupTask());
            return ValidateConstants.FAIL;
        }
        if (isExistedTask(request.getTask().getId())) {
            log.error("Task with originalId {} already exists", request.getTask().getId());
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedTask(String taskId) {
        return taskStore.findTaskByOriginalId(taskId) != null;
    }

    public boolean validateCreateScheduleTaskRequest(CreateScheduleTaskRequestDTO request) {
        if (isExistedScheduleId(request.getScheduleTaskId(), request.getTaskId())) {
            log.error("Task with scheduleId {} and taskId {} already exists", request.getScheduleTaskId(),
                    request.getTaskId());
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedScheduleId(String scheduleTaskId, String taskId) {
        return taskStore.findTaskByScheduleIdAndTaskId(scheduleTaskId, taskId) != null;
    }

    public boolean validateOptimTaskRequest(OptimizeTaskRequestDTO request) {
        if (!isExistedWorkOptimTask(request.getWorkOptimTaskId())) {
            log.error("WorkOptim Task with id {} not existed", request.getWorkOptimTaskId());
            return ValidateConstants.FAIL;
        }
        if (!isExistedTask(request.getTaskId())) {
            log.error("Task with id {} not existed", request.getTaskId());
            return ValidateConstants.FAIL;
        }
        if (isExistedScheduleId(request.getScheduleTaskId(), request.getTaskId())) {
            log.error("Task with scheduleId {} and taskId {} already exists", request.getScheduleTaskId(),
                    request.getTaskId());
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedWorkOptimTask(String workOptimTaskId) {
        return taskStore.findTaskById(workOptimTaskId) != null;
    }
}
