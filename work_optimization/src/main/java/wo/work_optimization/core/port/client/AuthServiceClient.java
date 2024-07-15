package wo.work_optimization.core.port.client;

import wo.work_optimization.core.domain.dto.response.UserResponseDTO;

public interface AuthServiceClient {
    UserResponseDTO getExistedUser(Long userId);
}
