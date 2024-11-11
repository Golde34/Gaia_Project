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
    private long userId;
    private String taskId;
    private String scheduleTaskId;
    private String scheduleTaskName;
}
