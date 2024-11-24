package wo.work_optimization.core.service.factory.strategy;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyService;
import wo.work_optimization.core.service.integration.TaskService;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@RequiredArgsConstructor
@Slf4j
public class AllTasksStrategy extends StrategyService {

    private final TaskService taskService;

    @Override
    public String strategy() {
        return "all";
    }

    @Override
    protected List<Task> doStrategy(OptimizeTaskRestRequestDTO request, List<ParentTask> parentTasks) {
        return taskService.getAllTasks(parentTasks).stream()
                .filter(task -> task.getActiveStatus().equals(Constants.ActiveStatus.ACTIVE_STR))
                .filter(task -> !task.getStatus().equals(Constants.TaskStatus.DONE))
                .collect(Collectors.toList());
    }

    @Override
    public void validateRequest(OptimizeTaskRestRequestDTO request) {
        if (DataUtils.isNullOrEmpty(request.getUserId())) {
            throw new IllegalArgumentException("User id is required");
        }
    }

    @Override
    public List<Task> queryTasks(OptimizeTaskRestRequestDTO request, List<ParentTask> parentTasks) {
        return taskService.getAllTasks(parentTasks);
    }
}
