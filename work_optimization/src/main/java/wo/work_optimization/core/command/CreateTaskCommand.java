package wo.work_optimization.core.command;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.port.kafka.MessageProcessingStrategy;
import wo.work_optimization.core.service.monoservices.TaskService;

@Slf4j
@Service
public class CreateTaskCommand implements MessageProcessingStrategy {

    private final TaskService taskService;

    public CreateTaskCommand(TaskService taskService) {
        this.taskService = taskService;
    }

    @Override
    public void process(String message, String command) {
        try {
            taskService.createTask(message);
            log.info("OK");
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
