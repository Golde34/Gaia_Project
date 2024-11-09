package wo.work_optimization.core.domain.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OptimizeTaskRequestDTO {
    private String taskId;
    private String scheduleTaskId;
    private String workOptimTaskId;
    private String isSync;
}
