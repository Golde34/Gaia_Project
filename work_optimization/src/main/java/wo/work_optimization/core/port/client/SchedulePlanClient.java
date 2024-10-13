package wo.work_optimization.core.port.client;

import wo.work_optimization.core.domain.entity.Task;

public interface SchedulePlanClient {
    Task getSchedulePlanId(String taskId);
}
