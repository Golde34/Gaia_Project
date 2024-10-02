package wo.work_optimization.infrastructure.store.adapter;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.infrastructure.store.repository.ParentTaskRepository;
import wo.work_optimization.infrastructure.store.repository.TaskRepository;

@Slf4j
@Service
public class TaskStoreAdapter implements TaskStore {
    
    private final TaskRepository taskRepository;
    private final ParentTaskRepository parentTaskRepository;

    public TaskStoreAdapter(TaskRepository taskRepository, ParentTaskRepository parentTaskRepository) {
        this.taskRepository = taskRepository;
        this.parentTaskRepository = parentTaskRepository;
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
        return parentTaskRepository.findBySchedulePlanId(scheduleId).get().getTask();
    }

    @Override
    public List<Task> findAllByGroupTask(String groupTaskId) {
        return parentTaskRepository.findByGroupTaskId(groupTaskId).get().getTask();
    }

    @Override
    public List<Task> findAllByProject(String projectId) {
        List<Task> tasks = new ArrayList<>();
        parentTaskRepository.findByProjectId(projectId).get().forEach(task -> tasks.addAll(task.getTask()));
        return tasks;
    }

    @Override
    public void save(Task task) {
        taskRepository.save(task);
        log.info("Task saved: {}", task);
    }
}
