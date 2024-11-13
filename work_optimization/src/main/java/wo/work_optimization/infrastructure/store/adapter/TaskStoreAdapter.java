package wo.work_optimization.infrastructure.store.adapter;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.infrastructure.store.repository.ParentTaskRepository;
import wo.work_optimization.infrastructure.store.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    }

    @Override
    public Task addParentTaskId(String taskId, ParentTask parentTask) {
        Optional<Task> task = taskRepository.findById(taskId);
        if (task.isEmpty()) {
            return null;
        }
        task.get().setParentTask(parentTask);
        taskRepository.save(task.get());
        return task.get();
    }

    @Override
    public Task findTaskByScheduleIdAndTaskId(String scheduleTaskId, String taskId) {
        Optional<Task> task = taskRepository.findByIdAndScheduleTaskId(taskId, scheduleTaskId);
        return task.orElse(null);
    }

    @Override
    public Task checkSyncWithSchedulePlan(String taskId, String scheduleId) {
        Optional<Task> task = taskRepository.findById(taskId);
        return task.filter(t -> t.getScheduleTaskId().equals(scheduleId)).orElse(null); 
    }

    @Override
    public Task checkSyncTask(String taskId, String scheduleTaskId, String workOptimId) {
        Optional<Task> task = taskRepository.findByOriginalIdAndScheduleTaskIdAndId(taskId, scheduleTaskId, workOptimId);
        return task.orElse(null);
    }

    @Override
    public Task findTaskById(String workOptimTaskId) {
        return taskRepository.findById(workOptimTaskId).orElse(null);
    }
}
