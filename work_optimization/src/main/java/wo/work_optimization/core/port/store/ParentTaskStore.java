package wo.work_optimization.core.port.store;

import wo.work_optimization.core.domain.entity.ParentTask;

import java.util.List;
import java.util.Optional;

public interface ParentTaskStore {
    ParentTask createParentTask(ParentTask parentTask);
    Optional<ParentTask> findByGroupTaskId(String groupTaskId);
    Optional<List<ParentTask>> findByProjectId(String projectId);
    Optional<ParentTask> findByScheduleId(String scheduleId);
    List<ParentTask> findAll();
    List<ParentTask> findByUserId(long userid);
}
