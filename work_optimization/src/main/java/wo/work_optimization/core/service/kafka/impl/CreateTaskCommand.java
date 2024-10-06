package wo.work_optimization.core.service.kafka.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateTaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.kafka.CommandService;
import wo.work_optimization.core.validation.TaskValidation;

import java.text.ParseException;

@Service
@Slf4j
public class CreateTaskCommand extends CommandService<CreateTaskRequestDTO, String> {

    private final TaskMapper taskMapper;
    private final TaskStore taskStore;
    private final TaskValidation taskValidation;

    public CreateTaskCommand(TaskMapper taskMapper, TaskStore taskStore, TaskValidation taskValidation) {
        this.taskMapper = taskMapper;
        this.taskStore = taskStore;
        this.taskValidation = taskValidation;
    }

    @Override
    public String command() {
        return TopicConstants.CreateTaskCommand.CREATE_TASK;
    }

    @Override
    public CreateTaskRequestDTO mapKafkaObject(Object kafkaObjectDto) {
        return taskMapper.mapCreateTask(kafkaObjectDto);
    }

    @Override
    public void validateRequest(CreateTaskRequestDTO request) {
        if (ValidateConstants.FAIL == taskValidation.validateCreateTaskRequest(request)) {
            log.error(String.format("Task with originalId %s already exists", request.getTask().getId()));
            throw new IllegalArgumentException("Validate fail by object existed!");
        }

    }

    @Override
    public String doCommand(CreateTaskRequestDTO request) {
        try {
            Task task = taskMapper.toEntity(request);
            taskStore.createTask(task);

            // Neu khoang thoi gian thuc hien task nam trong vung khoang thoi gian cua
            // schedule plan thi se add task vao schedule plan
            // schedulePlanStore.addTaskToSchedulePlan(request);

            // Thuc hien tinh toan lai schedule plan
            // schedulService.calculateSchedulePlan();

            return "OK";
        } catch (ParseException e) {
            log.error("Error while parsing date time", e);
            throw new IllegalArgumentException("Error while parsing date time");
        }
    }
}