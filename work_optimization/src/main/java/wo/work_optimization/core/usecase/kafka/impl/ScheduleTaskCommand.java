package wo.work_optimization.core.usecase.kafka.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.constant.ErrorConstants;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateScheduleTaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.integration.TaskService;
import wo.work_optimization.core.usecase.kafka.CommandService;
import wo.work_optimization.core.validation.TaskValidation;
import wo.work_optimization.kernel.utils.DataUtils;

import java.text.ParseException;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScheduleTaskCommand extends CommandService<CreateScheduleTaskRequestDTO, String> {

    private final TaskService taskService;
    private final TaskStore taskStore;
    private final TaskMapper taskMapper;
    private final TaskValidation taskValidation;

    @Override
    public String command() {
        return TopicConstants.CreateScheduleTaskCommand.CREATE_SCHEDULE_TASK;
    }

    @Override
    public CreateScheduleTaskRequestDTO mapKafkaObject(Object kafkaObjectDto) {
        try {
            return taskMapper.toCreateScheduleTaskRequestDTO(kafkaObjectDto);
        } catch (ParseException e) {
            log.error(String.format("Cannot map kafka object to entity: %s", e.getMessage()), e);
            return null;
        }
    }

    @Override
    public void validateRequest(CreateScheduleTaskRequestDTO request) {
        if (DataUtils.isNullOrEmpty(request.getTaskId())) {
            throw new BusinessException("Task ID is required");
        }
        if (DataUtils.isNullOrEmpty(request.getScheduleTaskId())) {
            throw new BusinessException("Schedule Task ID is required");
        }
        // if database has schedule task id return schedule task id is exist
        if (ValidateConstants.FAIL == taskValidation.validateCreateScheduleTaskRequest(request)) {
            throw new BusinessException("Schedule Task ID is exist");
        }
        return;
    }

    @Override
    public String doCommand(CreateScheduleTaskRequestDTO request) {
        try {
            Task task = taskService.getTaskByOriginalId(request.getTaskId());
            if (DataUtils.isNullOrEmpty(task)) {
                taskService.sendKafkaToSyncWithSchedulePlan(null, ErrorConstants.ErrorCode.FAIL,
                        "Sync failed because cannot fund task by original id");
                return "Cannot find task by original id";
            }
            task.setScheduleTaskId(request.getScheduleTaskId());
            taskStore.save(task);

            taskService.sendKafkaToSyncWithSchedulePlan(task, ErrorConstants.ErrorCode.SUCCESS, "Sync successfully");
            return "Save schedule task success";
        } catch (Exception e) {
            taskService.sendKafkaToSyncWithSchedulePlan(null, ErrorConstants.ErrorCode.FAIL, "Sync failed");
            log.error(String.format("Cannot save schedule task: %s", e.getMessage()), e);
            return "Save schedule task failed";
        }
    }
}
