package wo.work_optimization.core.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomScheduleTask {
    private String id;
    private double effort;
    private double enjoyability;
}
