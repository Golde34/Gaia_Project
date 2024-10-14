package wo.work_optimization.core.usecase.kafka.impl;

import java.text.ParseException;

import org.springframework.stereotype.Service;

import kafka.lib.java.adapter.producer.KafkaPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateScheduleTaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.usecase.kafka.CommandService;
import wo.work_optimization.core.validation.TaskValidation;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScheduleTaskCommand extends CommandService<CreateScheduleTaskRequestDTO, String> {

    private final TaskStore taskStore;
    private final TaskMapper taskMapper;
    private final TaskValidation taskValidation;
    private final DataUtils dataUtils;
    private final KafkaPublisher kafkaPublisher;

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
        if (dataUtils.isNullOrEmpty(request.getTaskId())) {
            throw new BusinessException("Task ID is required");
        }
        if (dataUtils.isNullOrEmpty(request.getScheduleTaskId())) {
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
        Task task = taskStore.findTaskByOriginalId(request.getTaskId());
        task.setScheduleTaskId(request.getScheduleTaskId());
        taskStore.save(task);

        kafkaPublisher.pushAsync("Sync success fully", TopicConstants.CreateScheduleTaskCommand.SYNC_SCHEDULE_TASK, "wo", null);
        return "Save schedule task success";
    }
    
}
