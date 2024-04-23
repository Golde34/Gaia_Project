package wo.work_optimization.core.service.kafka;

import org.springframework.stereotype.Component;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.impl.kafkacommand.CreateTaskService;
import wo.work_optimization.core.service.impl.kafkacommand.KafkaDefaultServices;
import wo.work_optimization.core.service.impl.kafkacommand.ScheduleTaskService;

@Component
public class CommandHandleFactory {

    private final TaskMapper taskMapper;
    private final TaskStore taskStore;

    public CommandHandleFactory(TaskMapper taskMapper, TaskStore taskStore) {
        this.taskMapper = taskMapper;
        this.taskStore = taskStore;
    }

    public MessageProcessingStrategy getCommandHandler(String command) {
        switch (command) {
            case TopicConstants.OptimizeTaskCommand.CREATE_TASK:
                return new CreateTaskService(taskMapper, taskStore);
            case TopicConstants.OptimizeTaskCommand.SCHEDULE_TASK:
                return new ScheduleTaskService();
            default:
                return new KafkaDefaultServices();
        }
    }
         
}
