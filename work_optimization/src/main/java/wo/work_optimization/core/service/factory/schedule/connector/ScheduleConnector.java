package wo.work_optimization.core.service.factory.schedule.connector;

import java.util.List;
import java.util.Map;

import wo.work_optimization.core.domain.entity.Task;

public interface ScheduleConnector {
    String method();
    Map<Integer, String> schedule(List<Task> tasks, Long userId);
}