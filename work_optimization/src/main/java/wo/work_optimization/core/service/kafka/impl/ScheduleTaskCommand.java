package wo.work_optimization.core.service.kafka.impl;

import java.text.ParseException;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.dto.request.CreateScheduleTaskRequestDTO;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.service.kafka.CommandService;

@Service
@Slf4j
public class ScheduleTaskCommand extends CommandService<CreateScheduleTaskRequestDTO, String> {

    private final TaskMapper taskMapper;

    public ScheduleTaskCommand(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

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
        // check taskId = null -> return error
        // check scheduleTaskId = null -> return error
        return;
    }

    @Override
    public String doCommand(CreateScheduleTaskRequestDTO request) {
        log.info("test schedule task");
        // Store in DB
        return "OK";
    }
    
}
