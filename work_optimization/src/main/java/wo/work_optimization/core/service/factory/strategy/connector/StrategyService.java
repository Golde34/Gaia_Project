package wo.work_optimization.core.service.factory.strategy.connector;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.service.integration.ParentTaskService;

@Service
@Slf4j
public abstract class StrategyService implements StrategyConnector {

    @Autowired
    private ParentTaskService parentTaskService;

    @Override
    public List<Task> handleStrategy(OptimizeTaskRestRequestDTO request) {
        try {
            validateRequest(request);
            List<ParentTask> parentTasks = parentTaskService.getParentTasksByUserId(request.getUserId());
            return doStrategy(request, parentTasks);
        } catch (Exception e) {
            log.error("Error while handling strategy", e);
            return Collections.emptyList();
        }
    }

    @Override
    public List<Task> returnTasks(OptimizeTaskRestRequestDTO request) {
        List<ParentTask> parentTasks = parentTaskService.getParentTasksByUserId(request.getUserId());
        return queryTasks(request, parentTasks); 
    }

    protected abstract void validateRequest(OptimizeTaskRestRequestDTO request);
    protected abstract List<Task> doStrategy(OptimizeTaskRestRequestDTO request, List<ParentTask> parentTasks);
    protected abstract List<Task> queryTasks(OptimizeTaskRestRequestDTO request, List<ParentTask> parentTasks);
}
