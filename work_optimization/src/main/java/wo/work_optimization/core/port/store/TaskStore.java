package wo.work_optimization.core.port.store;

import java.util.List;

import wo.work_optimization.core.domain.entity.Task;

public interface TaskStore {
    void createTask(Task task);
    Task findTaskByOriginalId(String originalId);
    List<Task> findAll();
    List<Task> findAllBySchedulePlan(String scheduleId);
}
