package wo.work_optimization.core.service.factory.strategy.connector;

import org.springframework.http.ResponseEntity;

import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

public interface StrategyConnector {
    String strategy();
    ResponseEntity<GeneralResponse<TaskResponseDTO>> handleStrategy(Long userId); 
}
