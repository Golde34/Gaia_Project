package wo.work_optimization.core.usecase.rest.schedule;

import org.springframework.http.ResponseEntity;

import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

public interface ScheduleConnector {
    String method();
    ResponseEntity<GeneralResponse<TaskResponseDTO>> schedule(TaskRequestDTO request);
}