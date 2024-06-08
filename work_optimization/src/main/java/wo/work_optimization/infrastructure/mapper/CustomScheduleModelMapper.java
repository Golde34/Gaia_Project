package wo.work_optimization.infrastructure.mapper;

import org.springframework.stereotype.Component;

import wo.work_optimization.infrastructure.algorithm.custom.CustomModel;

@Component
public class CustomScheduleModelMapper {
    public CustomModel map(double c1, double c2, double c3, double[] effort, double[] enjoyability, double maximumWorkTime, int taskLength) {
        return new CustomModel(c1, c2, c3, effort, enjoyability, maximumWorkTime, taskLength);
    }
}
