package wo.work_optimization.core.port.store;

import java.util.List;
import java.util.Optional;

import wo.work_optimization.core.domain.entity.ParentTask;

public interface ParentTaskStore {
    void createParentTask(ParentTask parentTask);
    Optional<ParentTask> findByGroupTaskId(String groupTaskId);
    Optional<List<ParentTask>> findByProjectId(String projectId);
    Optional<ParentTask> findByScheduleId(String scheduleId);
    List<ParentTask> findAll();
}
