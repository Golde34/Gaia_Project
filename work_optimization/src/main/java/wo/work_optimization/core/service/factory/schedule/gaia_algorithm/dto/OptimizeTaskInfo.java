package wo.work_optimization.core.service.factory.schedule.gaia_algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OptimizeTaskInfo {
    private String taskId;
    private double weight;
    private double stopTime;
    private double effort;
    private double enjoyability;
    private int taskOrder;
}
