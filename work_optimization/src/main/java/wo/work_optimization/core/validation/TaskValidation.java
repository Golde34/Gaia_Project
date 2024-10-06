package wo.work_optimization.core.validation;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.dto.request.CreateTaskRequestDTO;
import wo.work_optimization.core.domain.dto.request.GetGroupTaskProjectRequestDTO;
import wo.work_optimization.core.domain.dto.response.GroupTaskAndProjectResponseDTO;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.port.client.TaskManagerServiceClient;
import wo.work_optimization.core.port.store.ParentTaskStore;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.kernel.utils.DataUtils;

@Component
@RequiredArgsConstructor
public class TaskValidation {

    private final TaskManagerServiceClient taskManagerServiceClient; 
    private final TaskStore taskStore;
    private final ParentTaskStore parentTaskStore;
    private final DataUtils dataUtils;

    public boolean validateCreateTaskRequest(CreateTaskRequestDTO request) {
        if (isExistedTask(request)) {
            return ValidateConstants.FAIL;
        }
        if (parentTaskNotExisted(request)) {
            return ValidateConstants.FAIL;
        }
        return ValidateConstants.PASS;
    }

    private boolean isExistedTask(CreateTaskRequestDTO task) {
        return taskStore.findTaskByOriginalId(task.getTask().getId()) != null;
    }

    private boolean parentTaskNotExisted(CreateTaskRequestDTO request) {
        ParentTask existedParentTask = parentTaskStore.findByGroupTaskId(request.getGroupTask()).orElse(null);
        GetGroupTaskProjectRequestDTO tmRequest = GetGroupTaskProjectRequestDTO.builder()
                .taskId(request.getTaskId())
                .groupTask(request.getGroupTask())
                .project(request.getProject())
                .build();
        if (dataUtils.isNullOrEmpty(existedParentTask)) {
            GroupTaskAndProjectResponseDTO tmResponse = taskManagerServiceClient.getGroupTaskAndProject(tmRequest); 
            if (dataUtils.isNullOrEmpty(tmResponse)) {
                return ValidateConstants.FAIL;
            }
            ParentTask saveParentTask = ParentTask.builder()
                .groupTaskId(tmResponse.getGroupTaskId())
                .projectId(tmResponse.getProjectId())
                .groupTaskName(tmResponse.getGroupTaskName())
                .projectName(tmResponse.getProjectName())
                .build();
            parentTaskStore.createParentTask(saveParentTask); 
            taskStore.addParentTaskId(request.getTaskId(), saveParentTask); 
            return ValidateConstants.PASS;
        }
        return ValidateConstants.PASS;
    }
}
