package wo.work_optimization.core.service.integration;

import org.springframework.data.util.Pair;
import wo.work_optimization.core.domain.dto.request.QueryTaskConfigRequestDTO;
import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

public interface TaskRegistrationService {
    GeneralResponse<?> registerWorkOptimization(TaskRegistrationRequestDTO request);
    GeneralResponse<?> userRegisterTaskInformation(QueryTaskConfigRequestDTO request);
    Pair<String, Boolean> checkExistedUser(Long userId);
}
