package wo.work_optimization.core.service.integration.database;

import java.util.List;

import wo.work_optimization.core.domain.entity.ParentTask;

public interface ParentTaskService {
    List<ParentTask> getParentTasksByUserId(Long userId);
}
