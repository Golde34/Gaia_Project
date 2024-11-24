package wo.work_optimization.core.service.factory.schedule.gaia_algorithm.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptimizingTaskResult {
    private List<Double> weights;
    private List<Double> avgStopTime;
    private List<String> taskIds;
}
