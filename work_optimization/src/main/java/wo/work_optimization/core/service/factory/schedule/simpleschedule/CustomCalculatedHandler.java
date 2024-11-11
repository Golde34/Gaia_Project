package wo.work_optimization.core.service.factory.schedule.simpleschedule;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.apache.commons.math3.linear.RealVector;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.CustomScheduleTask;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.service.integration.impl.GlobalConfigService;
import wo.work_optimization.infrastructure.algorithm.custom.CustomConstantUpdating;
import wo.work_optimization.infrastructure.algorithm.custom.CustomModel;
import wo.work_optimization.infrastructure.mapper.CustomScheduleModelMapper;

@Service
public class CustomCalculatedHandler {
    private final CustomScheduleModelMapper mapper;
    private final CustomConstantUpdating constantUpdating;

    private final GlobalConfigService globalConfigService;
    private final TaskStore taskStore;

    public CustomCalculatedHandler(CustomScheduleModelMapper mapper, CustomConstantUpdating constantUpdating,
            GlobalConfigService globalConfigService, TaskStore taskStore) {
        this.mapper = mapper;
        this.constantUpdating = constantUpdating;
        this.globalConfigService = globalConfigService;
        this.taskStore = taskStore;
    }

    public void calculate() {
        // Get Constant Config
        List<Double> flowStateConstants = globalConfigService
                .getGlobalParamAsListDouble(Constants.WOConfiguration.CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS);
        double c1 = flowStateConstants.get(0);
        double c2 = flowStateConstants.get(1);
        double c3 = flowStateConstants.get(2);
        // Get deepWorkTime from User Constant Config
        int deepWorkTime = globalConfigService.getGlobalParamAsInteger(Constants.WOConfiguration.DEEP_WORK_TIME);
        // Get Task List
        String scheduleId = "1a2b3c";
        List<CustomScheduleTask> tasks = getListTaskOfSchedulePlan(scheduleId);
        // Convert Task List to double array of effort and enjoyability
        double[] effort = tasks.stream().mapToDouble(CustomScheduleTask::getEffort).toArray();
        double[] enjoyability = tasks.stream().mapToDouble(CustomScheduleTask::getEnjoyability).toArray();
        // Create customModel Object to optimize
        CustomModel customModel = mapper.map(c1, c2, c3, effort, enjoyability, deepWorkTime, tasks.size());
        customModel.optimize();
        // Store result to database
        for (CustomScheduleTask task : tasks) {
            // convert customScheduleTask to Task
            Task taskEntity = Task.builder()
                    .priority(((int)task.getEffort()))
                    .duration(task.getEnjoyability())
                    .build();
            // save taskEntity to database
            taskStore.save(taskEntity);
        }
        // Example:
        // double[] effort = { 3, 6, 4, 8, 7 };
        // double[] enjoyability = { 2, 5, 4, 3, 3 };
        // double maximumWorkTime = 8;
        // int taskLenght = effort.length;
        // CustomModel customModel = mapper.map(0.56, -0.24, 0, effort, enjoyability, maximumWorkTime, taskLenght);
        // customModel.optimize();
    }

    public void updateConstant(String scheduleId) {
        // get constant store in config param
        RealVector constantVector = globalConfigService.getGlobalParamAsRealVector(
            Constants.WOConfiguration.CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS
        );
        // get list task with effort and enjoyability
        List<CustomScheduleTask> tasks = getListTaskOfSchedulePlan(scheduleId);
        // convert list task to array of effort and enjoyability
        double[] E = tasks.stream().mapToDouble(CustomScheduleTask::getEffort).toArray();
        double[] B = tasks.stream().mapToDouble(CustomScheduleTask::getEnjoyability).toArray();
        // calculate the elements of the coefficient matrix
        RealVector result = constantUpdating.solve(E, B, constantVector);
        // save Constant params
        saveCustomConstantResult(result);
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
        return priority * 2;
    }

    private void saveCustomConstantResult(RealVector result) {
        // convert real vector to list double
        String resultConstantList = IntStream.range(0, result.getDimension())
                .mapToObj(result::getEntry).toList().toString();
        globalConfigService.setParamConfig(Constants.WOConfiguration.CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS,
                resultConstantList);
    }
}
