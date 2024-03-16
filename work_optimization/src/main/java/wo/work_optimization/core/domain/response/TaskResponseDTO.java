package wo.work_optimization.core.domain.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TaskResponseDTO {
    private String schedule;
}
