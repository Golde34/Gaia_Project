package wo.work_optimization.infrastructure.store.adapter;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.infrastructure.store.repository.TaskRepository;

@Slf4j
@Service
public class TaskStoreAdapter implements TaskStore {
    
    private final TaskRepository taskRepository;

    public TaskStoreAdapter(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public void createTask(Task task) {
        taskRepository.save(task);
        log.info("Task created: {}", task);
    }
}
