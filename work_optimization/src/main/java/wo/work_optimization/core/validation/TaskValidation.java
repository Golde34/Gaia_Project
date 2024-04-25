package wo.work_optimization.core.validation;

import org.springframework.stereotype.Component;

import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;

@Component
public class TaskValidation {
    private final TaskStore taskStore;

    public TaskValidation(TaskStore taskStore) {
        this.taskStore = taskStore;
    }

    public boolean validateCreateTask(Task task) {
        if (isExistedTask(task)) {
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedTask(Task task) {
        return taskStore.findTaskByOriginalId(task.getOriginalId()) != null;
    }
}
