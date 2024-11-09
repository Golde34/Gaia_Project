package wo.work_optimization.core.port.store;

import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.domain.entity.Task;

import java.util.List;

public interface TaskStore {
    void save(Task task);
    void createTask(Task task);
    Task findTaskByOriginalId(String originalId);
    List<Task> findAll();
    List<Task> findAllBySchedulePlan(String scheduleId);
    List<Task> findAllByGroupTask(String groupTaskId);
    List<Task> findAllByProject(String projectId);
    Task addParentTaskId(String taskId, ParentTask parentTask);
    Task findTaskByScheduleIdAndTaskId(String scheduleTaskId, String taskId);
    Task checkSyncWithSchedulePlan(String taskId, String scheduleId); 
    Task checkSyncTask(String taskId, String scheduleTaskId, String workOptimTaskId);
    Task findTaskById(String workOptimTaskId);
}
