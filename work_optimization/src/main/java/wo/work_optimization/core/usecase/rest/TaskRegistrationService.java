package wo.work_optimization.core.usecase.rest;

import wo.work_optimization.core.domain.dto.request.QueryTaskConfigRequestDTO;
import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

public interface TaskRegistrationService {
    GeneralResponse<?> registerWorkOptimization(TaskRegistrationRequestDTO request);
    GeneralResponse<?> userRegisterTaskInformation(QueryTaskConfigRequestDTO request);
}
