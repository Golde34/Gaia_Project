package wo.work_optimization.core.validation;

import org.springframework.stereotype.Component;

import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateTaskRequestDTO;
import wo.work_optimization.core.port.store.TaskStore;

@Component
public class TaskValidation {
    private final TaskStore taskStore;

    public TaskValidation(TaskStore taskStore) {
        this.taskStore = taskStore;
    }

    public boolean validateCreateTask(CreateTaskRequestDTO request) {
        if (isExistedTask(request)) {
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedTask(CreateTaskRequestDTO task) {
        return taskStore.findTaskByOriginalId(task.getTask().getId()) != null;
    }
}
