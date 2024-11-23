package wo.work_optimization.core.service.factory.schedule.gaia_algorithm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.math3.linear.RealVector;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.dto.CustomScheduleTask;
import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.store.TaskRegistrationStore;
import wo.work_optimization.infrastructure.algorithm.custom.CustomConstantUpdating;
import wo.work_optimization.infrastructure.algorithm.custom.CustomModel;
import wo.work_optimization.infrastructure.mapper.CustomScheduleModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomCalculatedHandler {
    private final CustomScheduleModelMapper mapper;
    private final CustomConstantUpdating constantUpdating;

    private final TaskRegistrationStore taskRegistrationStore;

    public List<Task> optimize(TaskRequestDTO request) {
        // Get Flow State Constants
        double c1 = request.getTaskRegistration().getConstant1();
        double c2 = request.getTaskRegistration().getConstant2();
        double c3 = request.getTaskRegistration().getConstant3();
        // Get optimizing variables
        List<CustomScheduleTask> tasks = getListTasksToOptimize(request.getTasks());
        List<String> taskIds = tasks.stream().map(CustomScheduleTask::getId).toList();
        double[] effort = takeEffortList(tasks, taskIds);
        double[] enjoyability = takeEnjoyabilityList(tasks, taskIds);
        double deepWorkTime = request.getTaskRegistration().getWorkTime();
        // Optimize Task
        CustomModel customModel = mapper.map(c1, c2, c3, effort, enjoyability, deepWorkTime, tasks.size());
        Map<String, List<Double>> optimizedWeightsAndAvgStopTime = customModel.optimize();
        // Map Result
        List<Double> weights = optimizedWeightsAndAvgStopTime.get("weights");
        List<Double> avgStopTime = optimizedWeightsAndAvgStopTime.get("averageStopTime");
        for (int i = 0; i < taskIds.size(); i++) {
            String taskId = taskIds.get(i);
            Double weight = weights.get(i);
            Double stopTime = avgStopTime.get(i);
            System.out.printf("Task ID: %s, Weight: %.2f, Avg Stop Time: %.2f%n", taskId, weight, stopTime);
        }
        // Store result to database
        return null;
    }

    private List<CustomScheduleTask> getListTasksToOptimize(List<Task> tasks) {
        // convert task to array wrap effort value and enjoyability value
        List<CustomScheduleTask> convertedTask = new ArrayList<>();
        tasks.forEach(i -> convertedTask.add(CustomScheduleTask.builder()
                .effort(convertEffort(i.getPriority(), i.getDuration()))
                .enjoyability(convertEnjoyability(i.getPriority()))
                .id(i.getId())
                .build()));
        return convertedTask;
    }

    private double convertEffort(double priority, double duration) {
        return (double) priority * duration;
    }

    private double convertEnjoyability(double priority) {
        return priority * 2;
    }

    private double[] takeEffortList(List<CustomScheduleTask> tasks, List<String> taskIds) {
        Map<String, Double> taskEfforts = tasks.stream()
                .collect(Collectors.toMap(CustomScheduleTask::getId, CustomScheduleTask::getEffort));
        return taskIds.stream().map(taskEfforts::get).mapToDouble(Double::doubleValue).toArray();
    }

    private double[] takeEnjoyabilityList(List<CustomScheduleTask> tasks, List<String> taskIds) {
        Map<String, Double> taskEnjoyability = tasks.stream()
                .collect(Collectors.toMap(CustomScheduleTask::getId, CustomScheduleTask::getEnjoyability));
        return taskIds.stream().map(taskEnjoyability::get).mapToDouble(Double::doubleValue).toArray();
    }

    public void updateConstant(long userId, double c1, double c2, double c3, List<Task> taskList) {
        // get constant vector from c1, c2, c3
        RealVector constantVector = constantUpdating.getConstantVector(c1, c2, c3);

        List<CustomScheduleTask> tasks = getListTasksToOptimize(taskList);
        // convert list task to array of effort and enjoyability
        double[] E = tasks.stream().mapToDouble(CustomScheduleTask::getEffort).toArray();
        double[] B = tasks.stream().mapToDouble(CustomScheduleTask::getEnjoyability).toArray();
        // calculate the elements of the coefficient matrix
        RealVector result = constantUpdating.solve(E, B, constantVector);
        // save Constant params
        int isSaved = saveCustomConstantResult(userId, result);
        if (isSaved == 1) {
            log.info("Update constant success");
        } else {
            log.error("Update constant failed");
        }
    }

    private int saveCustomConstantResult(long userId, RealVector result) {
        // convert real vector to list double
        double c1 = result.getEntry(0);
        double c2 = result.getEntry(1);
        double c3 = result.getEntry(2);
        return taskRegistrationStore.updateUserConstant(userId, c1, c2, c3);
    }
}
