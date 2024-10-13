package wo.work_optimization.infrastructure.client.adapter;

import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.client.SchedulePlanClient;

public class SchedulePlanAdapter implements SchedulePlanClient {

    @Override
    public Task getSchedulePlanId(String taskId) {
        return null;
    }
    
}
