package wo.work_optimization.core.service.factory.strategy.connector;

import java.util.List;

import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.entity.Task;

public interface StrategyConnector {
    String strategy();
    List<Task> handleStrategy(OptimizeTaskRestRequestDTO request); 
    List<Task> returnTasks(OptimizeTaskRestRequestDTO request);
}
