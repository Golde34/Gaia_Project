package wo.work_optimization.core.port.client;

import org.springframework.http.ResponseEntity;

import wo.work_optimization.core.domain.dto.response.UserResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

public interface AuthServiceClient {
    UserResponseDTO checkExistedUser(Long userId);
    UserResponseDTO getExistedUser(Long userId);
}
