package wo.work_optimization.core.service.factory.strategy;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyService;
import wo.work_optimization.core.service.integration.TaskService;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@Slf4j
public class TasksInDayStrategy extends StrategyService {

    @Autowired
    private TaskService taskService;

    @Override
    public String strategy() {
        return "in_day";
    }

    @Override
    protected List<Task> doStrategy(OptimizeTaskRestRequestDTO request, List<ParentTask> parentTasks) {
        return taskService.getTasksInDay(parentTasks, request.getOptimizedDate());
    }

    @Override
    public void validateRequest(OptimizeTaskRestRequestDTO request) {
        if (DataUtils.isNullOrEmpty(request.getUserId())) {
            throw new IllegalArgumentException("User id is required");
        }
        if (DataUtils.isNullOrEmpty(request.getOptimizedDate())) {
            throw new IllegalArgumentException("Date is required");
        }
    }

    @Override
    public List<Task> queryTasks(OptimizeTaskRestRequestDTO request, List<ParentTask> parentTasks) {    
        return taskService.getTasksInDay(parentTasks, request.getOptimizedDate());
    }
    
}
