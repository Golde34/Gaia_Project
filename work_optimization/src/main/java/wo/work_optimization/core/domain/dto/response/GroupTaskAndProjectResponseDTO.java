package wo.work_optimization.core.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupTaskAndProjectResponseDTO {
    private String groupTaskId;
    private String groupTaskName;
    private String projectId;
    private String projectName;
}
