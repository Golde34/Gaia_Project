package wo.work_optimization.core.service.kafka.impl;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.validation.TaskValidation;

@Service
@Slf4j
public class GaiaCreateTaskCommand extends CreateTaskCommand {
    
    public GaiaCreateTaskCommand(TaskMapper taskMapper, TaskStore taskStore, TaskValidation taskValidation) {
        super(taskMapper, taskStore, taskValidation);
    }

    @Override
    public String command() {
        return TopicConstants.CreateTaskCommand.GAIA_CREATE_TASK;
    }
}