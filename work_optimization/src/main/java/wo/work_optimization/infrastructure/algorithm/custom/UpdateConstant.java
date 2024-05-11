package wo.work_optimization.infrastructure.algorithm.custom;

import java.util.List;
import java.util.stream.IntStream;

import org.apache.commons.math3.linear.ArrayRealVector;
import org.apache.commons.math3.linear.RealVector;

import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.service.rest.GlobalConfigService;

public class UpdateConstant {

    private final GlobalConfigService globalConfigService;
    // private final TaskService

    public UpdateConstant(GlobalConfigService globalConfigService) {
        this.globalConfigService = globalConfigService;
    }

    public void UpdateConstant() {
        // get constant store in config param
        RealVector constantVector = getConstantConfig();        
        // get list task with effort and enjoyability
        
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

    private void getListTaskOfUser() {
        // get list task cua user trong mot schedule plan

        // convert task to array wrap effort value and enjoyability value

    }

    private void calculateCoefficientMatrix() {
        return;
    }

    private void constructCoefficientMatrix() {

    }

    private void constructConstantMatrix() {

    }
}
