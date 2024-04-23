package wo.work_optimization.core.service.impl.kafkacommand;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.kafka.MessageProcessingStrategy;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

import java.text.ParseException;

@Slf4j
@Service
public class CreateTaskService implements MessageProcessingStrategy {

    private final TaskMapper taskMapper;
    private final TaskStore taskStore;

    public CreateTaskService(TaskMapper taskMapper, TaskStore taskStore) {
        this.taskMapper = taskMapper;
        this.taskStore = taskStore;
    }

    @Override
    public void process(String message, String command) {
        try {
            log.info("{} command", command);
            log.info("message: {}", message);
            Task task = taskMapper.toEntity(ExtractKafkaMessage.getData(message));
            taskStore.createTask(task);
        } catch (ParseException e) {
            log.error(e.getMessage());
        }
    }
}
