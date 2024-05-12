package wo.work_optimization.infrastructure.algorithm.custom;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.commons.math3.linear.*;

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
        double[] E = tasks.stream().mapToDouble(CustomScheduleTask::getEffort).toArray();
        double[] B = tasks.stream().mapToDouble(CustomScheduleTask::getEnjoyability).toArray();
        // construct the coefficient matrix
        RealVector result = solve(E, B, constantVector);
        // save Constant params
        saveResult(result);
    }

    private RealVector getConstantConfig() {
        List<Double> flowStateConstants = globalConfigService.getGlobalParamAsListDouble(Constants.WOConfiguration.CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS);
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
        return priority * 2;
    }

    private RealVector solve(double[] E, double[] beta, RealVector constantVector) {
        double sum_E_squared = 0.0, sum_E_beta = 0.0, sum_E = 0.0;
        double sum_beta_squared = 0.0, sum_beta = 0.0;
        double sum_phi_E = 0.0, sum_phi_beta = 0.0, sum_phi = 0.0;
        int n = E.length;
        double[] phi= getPhi(constantVector.getEntry(0), constantVector.getEntry(1), constantVector.getEntry(2), E, beta);
        for (int i = 0; i < n; i++) {
            sum_E_squared += Math.pow(E[i], 2);
            sum_E_beta += E[i] * beta[i];
            sum_E += E[i];

            sum_beta_squared += Math.pow(beta[i], 2);
            sum_beta += beta[i];

            sum_phi_E += E[i] * phi[i];
            sum_phi_beta += beta[i] * phi[i];
            sum_phi += phi[i];
        }
        // construct the coefficient matrix
        RealMatrix coefficients = MatrixUtils.createRealMatrix(new double[][] {
                { sum_E_squared / n, sum_E_beta / n, sum_E / n },
                { sum_E_beta / n, sum_beta_squared / n, sum_beta / n },
                { sum_E / n, sum_beta / n, 1 }
        });

        // construct the constant matrix
        RealVector constants = new ArrayRealVector(new double[] {
                sum_phi_E / n, sum_phi_beta / n, sum_phi / n
        });
        // solve
        DecompositionSolver solver = new LUDecomposition(coefficients).getSolver();
        return solver.solve(constants);
    }

    private double[] getPhi(double c1, double c2, double c3, double[] E, double[] B) {
        return IntStream.range(0, E.length)
                .mapToDouble(i -> c1*E[i] + c2*B[i] + c3).toArray();
    }

    private void saveResult(RealVector result) {
        // convert real vector to list double
        String resultConstantList = IntStream.range(0, result.getDimension())
                .mapToObj(result::getEntry).toList().toString();
        globalConfigService.setParamConfig(Constants.WOConfiguration.CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS, resultConstantList);
    }
}
