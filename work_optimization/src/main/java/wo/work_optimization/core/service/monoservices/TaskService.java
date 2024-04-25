package wo.work_optimization.core.service.monoservices;

import java.text.ParseException;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

@Service
@Slf4j
public class TaskService {

    private final TaskMapper taskMapper;
    private final TaskStore taskStore;

    public TaskService(TaskMapper taskMapper, TaskStore taskStore) {
        this.taskMapper = taskMapper;
        this.taskStore = taskStore;
    }

    public void createTask(String message) {
        try {
            Task task = taskMapper.toEntity(ExtractKafkaMessage.getData(message));
            taskStore.createTask(task);
        } catch (ParseException e) {
            log.error(String.format("Cannot map kafka task object to entity: %s", e.getMessage()), e);            
        }
    }
}
