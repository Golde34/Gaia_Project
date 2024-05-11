package wo.work_optimization.infrastructure.store.adapter;

import jakarta.transaction.Transactional;

import java.util.List;

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

    @Override
    public Task findTaskByOriginalId(String originalId) {
        return taskRepository.findByOriginalId(originalId);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> findAllBySchedulePlan(String scheduleId) {
        return taskRepository.findBySchedulePlanId(scheduleId);
    }
}
