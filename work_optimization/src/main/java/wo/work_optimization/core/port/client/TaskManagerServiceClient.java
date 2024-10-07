package wo.work_optimization.core.port.client;

import wo.work_optimization.core.domain.dto.request.GetGroupTaskProjectRequestDTO;
import wo.work_optimization.core.domain.dto.response.GroupTaskAndProjectResponseDTO;

public interface TaskManagerServiceClient {
    GroupTaskAndProjectResponseDTO getGroupTaskAndProject(String taskId, GetGroupTaskProjectRequestDTO request); 
}
