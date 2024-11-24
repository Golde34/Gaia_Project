package wo.work_optimization.infrastructure.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import wo.work_optimization.core.service.factory.schedule.gaia_algorithm.dto.OptimizingTaskResult;
import wo.work_optimization.core.service.factory.schedule.gaia_algorithm.dto.OptimizingVariables;
import wo.work_optimization.infrastructure.algorithm.custom.CustomModel;

@Component
public class CustomScheduleModelMapper {
    public CustomModel map(OptimizingVariables optimizingVariables) {
        return new CustomModel(optimizingVariables.getC1(), optimizingVariables.getC2(),
                optimizingVariables.getC3(), optimizingVariables.getEffort(),
                optimizingVariables.getEnjoyability(), optimizingVariables.getDeepWorkTime(),
                optimizingVariables.getSize());
    }

    public OptimizingVariables map(double c1, double c2, double c3, double[] effort, double[] enjoyability,
            double deepWorkTime, int size) {
        return OptimizingVariables.builder()
                .c1(c1)
                .c2(c2)
                .c3(c3)
                .effort(effort)
                .enjoyability(enjoyability)
                .deepWorkTime(deepWorkTime)
                .size(size)
                .build();
    }

    public OptimizingTaskResult map(List<Double> weights, List<Double> avgStopTime, List<String> taskIds) {
        return OptimizingTaskResult.builder()
                .weights(weights)
                .avgStopTime(avgStopTime)
                .taskIds(taskIds)
                .build();
    }
}
