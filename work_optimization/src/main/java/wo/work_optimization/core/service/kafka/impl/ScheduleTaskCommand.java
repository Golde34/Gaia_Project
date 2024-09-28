package wo.work_optimization.core.service.kafka.impl;

import java.text.ParseException;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.service.kafka.CommandService;

@Service
@Slf4j
public class ScheduleTaskCommand extends CommandService<Task, String> {

    private final TaskMapper taskMapper;

    public ScheduleTaskCommand(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public String command() {
        return TopicConstants.CreateTaskCommand.SCHEDULE_TASK;
    }

    @Override
    public Task mapKafkaObject(Object kafkaObjectDto) {
        try {
            return taskMapper.toEntity(kafkaObjectDto);
        } catch (ParseException e) {
            log.error(String.format("Cannot map kafka object to entity: %s", e.getMessage()), e);
            return null;
        }
    }

    @Override
    public void validateRequest(Task request) {
        return;
    }

    @Override
    public String doCommand(Task request) {
        log.info("test schedule task");
        return "OK";
    }
    
}
