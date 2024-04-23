package wo.work_optimization.core.port.store;

import wo.work_optimization.core.domain.entity.Task;

public interface TaskStore {
    void createTask(Task task);
}
