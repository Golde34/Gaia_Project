package wo.work_optimization.core.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.client.SchedulePlanClient;
import wo.work_optimization.core.port.store.TaskStore;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskService {

    private final TaskStore taskStore;
    private final SchedulePlanClient schedulePlanClient;

    public void synchronzedWithSchedulePlan(String taskId, String scheduleId) {
        boolean isSync = taskStore.checkSyncWithSchedulePlan(taskId, scheduleId) != null;        
        if (!isSync) {
            Task task = schedulePlanClient.getSchedulePlanId(taskId);
            if (task != null) {
                taskStore.createTask(task);
            }
        }
    }
}
