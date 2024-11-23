package wo.work_optimization.core.service.factory.schedule.connector;

import java.util.List;

import wo.work_optimization.core.domain.entity.Task;

public interface ScheduleConnector {
    String method();
    List<Task> schedule(List<Task> tasks, Long userId);
}