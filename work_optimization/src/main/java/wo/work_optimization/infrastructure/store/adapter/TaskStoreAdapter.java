package wo.work_optimization.infrastructure.store.adapter;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;

@Slf4j
@Service
public class TaskStoreAdapter implements TaskStore {
    
    @Override
    public void createTask(Task task) {
        log.info("Task created: {}", task);
    }
}
