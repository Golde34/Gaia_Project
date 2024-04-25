package wo.work_optimization.core.port.kafka;

import org.springframework.stereotype.Component;

import wo.work_optimization.core.command.CreateTaskCommand;
import wo.work_optimization.core.command.KafkaDefaultCommand;
import wo.work_optimization.core.command.ScheduleTaskCommand;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.service.monoservices.TaskService;

@Component
public class CommandHandleFactory {

    private final TaskService taskService; 

    public CommandHandleFactory(TaskService taskService) {
        this.taskService = taskService;
    }

    public MessageProcessingStrategy getCommandHandler(String command) {
        switch (command) {
            case TopicConstants.OptimizeTaskCommand.CREATE_TASK:
                return new CreateTaskCommand(taskService);
            case TopicConstants.OptimizeTaskCommand.SCHEDULE_TASK:
                return new ScheduleTaskCommand();
            default:
                return new KafkaDefaultCommand();
        }
    }
         
}
