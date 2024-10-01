package wo.work_optimization.core.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateScheduleTaskRequestDTO {
    private String taskId;
    private String scheduleTaskId;
}
