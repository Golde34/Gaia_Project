package wo.work_optimization.core.service.factory.strategy;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyService;
import wo.work_optimization.core.service.integration.TaskService;

@Service
@RequiredArgsConstructor
@Slf4j
public class AllTasksStrategy extends StrategyService<String, List<Task>> {

    private final TaskService taskService;

    @Override
    public String strategy() {
        return "all";
    }

    @Override
    public List<Task> handleStrategy(Long userId) {
        return taskService.getAllTasks(userId).stream()
        .filter(task -> task.getActiveStatus().equals(Constants.ActiveStatus.ACTIVE_STR))
        .filter(task -> !task.getStatus().equals(Constants.TaskStatus.DONE))
        .collect(Collectors.toList());
    }
}
