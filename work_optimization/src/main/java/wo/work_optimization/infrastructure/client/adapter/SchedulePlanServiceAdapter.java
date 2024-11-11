package wo.work_optimization.infrastructure.client.adapter;

import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.client.SchedulePlanClient;

@Service
public class SchedulePlanServiceAdapter implements SchedulePlanClient {

    @Override
    public Task getSchedulePlanId(String taskId) {
        return null;
    }
    
}
