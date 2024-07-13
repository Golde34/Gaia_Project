package wo.work_optimization.core.service.rest;

import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

public interface TaskRegistrationService {
    GeneralResponse<String> registerWorkOptimization(TaskRegistrationRequestDTO request);
}
