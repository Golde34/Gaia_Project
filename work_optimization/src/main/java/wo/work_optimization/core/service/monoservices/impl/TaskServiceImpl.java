package wo.work_optimization.core.service.monoservices.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.monoservices.TaskService;
import wo.work_optimization.core.validation.TaskValidation;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

import java.text.ParseException;

@Service
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskMapper taskMapper;
    private final TaskStore taskStore;
    private final TaskValidation taskValidation;

    public TaskServiceImpl(TaskMapper taskMapper, TaskStore taskStore, TaskValidation taskValidation) {
        this.taskMapper = taskMapper;
        this.taskStore = taskStore;
        this.taskValidation = taskValidation;
    }

    public void createTask(String message) {
        try {
            Task task = taskMapper.toEntity(ExtractKafkaMessage.getData(message));
            if (ValidateConstants.PASS == taskValidation.validateCreateTask(task)) {
                taskStore.createTask(task);
            } else {
                log.error(String.format("Task with originalId %s already exists", task.getOriginalId()));
            }
        } catch (ParseException e) {
            log.error(String.format("Cannot map kafka task object to entity: %s", e.getMessage()), e);
        }
    }
}