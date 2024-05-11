package wo.work_optimization.infrastructure.algorithm.custom;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.apache.commons.math3.linear.ArrayRealVector;
import org.apache.commons.math3.linear.RealVector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.CustomScheduleTask;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.rest.GlobalConfigService;

@Component
public class UpdateSimpleScheduleConstant {

    @Autowired
    private GlobalConfigService globalConfigService;
    @Autowired
    private TaskStore taskStore;

    public void UpdateConstant(String scheduleId) {
        // get constant store in config param
        RealVector constantVector = getConstantConfig();        
        // get list task with effort and enjoyability
        List<CustomScheduleTask> tasks = getListTaskOfSchedulePlan(scheduleId);        
        // calculate the elements of the coefficient matrix

        // construct the coefficient matrix

        // construct the constant matrix

        // solve

        // save Constant params
    }

    private RealVector getConstantConfig() {
        List<Integer> flowStateConstants = globalConfigService.getGlobalParamAsListInteger(Constants.WOConfiguration.CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS);
        RealVector constantVector = new ArrayRealVector(flowStateConstants.size());
        IntStream.range(0, flowStateConstants.size())
                    .forEach(i -> constantVector.setEntry(i, flowStateConstants.get(i))); 
        return constantVector;
    }

    private List<CustomScheduleTask> getListTaskOfSchedulePlan(String scheduleId) {
        // get list task cua user trong mot schedule plan
        List<Task> tasks = taskStore.findAllBySchedulePlan(scheduleId);
        // convert task to array wrap effort value and enjoyability value
        List<CustomScheduleTask> convertedTask = new ArrayList<>();
        tasks.forEach(i -> convertedTask.add(CustomScheduleTask.builder()
                            .effort(convertEffort(i.getPriority(), i.getDuration()))
                            .enjoyability(convertEnjoyability(i.getPriority()))
                            .build()));
        return convertedTask;
    }

    private double convertEffort(double priority, double duration) {
        return (double) priority * duration;
    }

    private double convertEnjoyability(double priority) {
        return 3;
    }

    private void calculateCoefficientMatrix() {
        return;
    }

    private void constructCoefficientMatrix() {

    }

    private void constructConstantMatrix() {

    }
}
