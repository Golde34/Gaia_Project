package wo.work_optimization.core.usecase.kafka.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.service.integration.impl.TaskService;
import wo.work_optimization.core.usecase.kafka.CommandService;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptimizeTaskCommand extends CommandService<OptimizeTaskRequestDTO, String> {

    private final TaskService taskService;
    private final TaskMapper taskMapper;
    private final DataUtils dataUtils;

    @Override
    public String command() {
        return TopicConstants.CreateTaskCommand.OPTIMIZE_TASK; 
    }

    @Override
    public OptimizeTaskRequestDTO mapKafkaObject(Object kafkaObjectDto) {
        OptimizeTaskRequestDTO optimizeTask = taskMapper.toOptimizeTaskRequestDTO(kafkaObjectDto);
        log.info("OptimizeTaskCommand mapKafkaObject: {}", optimizeTask.toString());
        return optimizeTask;
    }

    @Override
    public void validateRequest(OptimizeTaskRequestDTO request) {
//        if (dataUtils)
        log.info("OptimizeTaskCommand validateRequest: {}", request.toString());
    }

    @Override
    public String doCommand(OptimizeTaskRequestDTO request) {
        // Get task by task id, workoptim id, scheduletask id from database
        Task task = taskService.getTask(request);
        log.info("OptimizeTaskCommand doCommand: {}", task.toString());
        // Call auth service to get user settings
        // Get task config from database
        // Optimize task
        return "OptimizeTaskCommand doCommand";
    }
    

}
