package wo.work_optimization.core.validation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateTaskRequestDTO;
import wo.work_optimization.core.port.store.TaskStore;

@Component
@RequiredArgsConstructor
public class TaskValidation {

    private final TaskStore taskStore;

    public boolean validateCreateTaskRequest(CreateTaskRequestDTO request) {
        if (isExistedTask(request)) {
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedTask(CreateTaskRequestDTO task) {
        return taskStore.findTaskByOriginalId(task.getTask().getId()) != null;
    }
}
