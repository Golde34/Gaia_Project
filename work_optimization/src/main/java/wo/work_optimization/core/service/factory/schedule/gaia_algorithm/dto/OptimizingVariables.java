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
public class OptimizingVariables {
    private double c1;
    private double c2;
    private double c3;
    private double[] effort;
    private double[] enjoyability;
    private double deepWorkTime;
    private int size;
}
