package wo.work_optimization.core.service.schedule;

import org.springframework.http.ResponseEntity;
import wo.work_optimization.core.domain.response.base.GeneralResponse;
import wo.work_optimization.core.domain.request.TaskRequestDTO;
import wo.work_optimization.core.domain.response.TaskResponseDTO;

public interface ScheduleConnector {
    String method();
    ResponseEntity<GeneralResponse<TaskResponseDTO>> schedule(TaskRequestDTO request);
}