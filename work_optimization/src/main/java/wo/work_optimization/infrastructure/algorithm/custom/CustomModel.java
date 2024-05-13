package wo.work_optimization.infrastructure.algorithm.custom;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomModel {
    private final double c1 = 0.56;     // Constant 1
    private final double c2 = -0.24;    // Constant 2
    private final double c3 = 0;        // Constant 3

    private double p0;
    private double k;
    private double alpha;

    private double t;                   // Time
    private double effort;              // 1 <= E <= 5
    private double enjoyability;        // 1 <= B <= 2

    public CustomModel(double effort, double enjoyability, double t) {
        this.effort = effort;
        this.enjoyability = enjoyability;
        this.t = t;
    }

    private void defineInputBoundary() {
        setEnjoyability(getEnjoyability()/9 + 8f/9);
        setEffort(getEffort()*4/9 + 5f/9);
    }

    private double calculateFlowState() {
        return c1*this.effort + c2*this.enjoyability + c3;
    }

    private void calculateK(double t) {
        double onePerFlowState = t / calculateFlowState();
        setK(onePerFlowState);
    }

    private void calculateInitialProductivity() {
        double initialProductivity = Math.pow(this.enjoyability, 2) / Math.pow(this.effort, 2);
        setP0(initialProductivity);
    }

    private void calculateAlpha() {
        double a = Math.pow(this.enjoyability, 2) * Math.log(this.effort)+ Math.pow(this.enjoyability, 2);
        setAlpha(a);
    }

    public double calculateProductivityCurve(double t) {
        return this.p0 + this.alpha * t * Math.exp(this.k * -1);
    }

    public double optimizeTaskTime() {
        defineInputBoundary();
        calculateAlpha();
        return solveEquation();
    }

    private double getFunction(double t, double flowState) {
        return this.alpha * Math.exp(-t / flowState) * (Math.pow(t, 2) / Math.pow(flowState, 2) + t / flowState + 1) - this.alpha;
    }

    private double getDerivative(double t, double flowState) {
        return -alpha * Math.exp(-t / flowState) * (2 * t / Math.pow(flowState, 3) + 1 / Math.pow(flowState, 2));
    }

    public double solveEquation() {
        double flowState = calculateFlowState();
        double t = 1;
        int maxIterations = 1000;
        double tolerance = 1e-6;

        for (int i = 0; i < maxIterations; i++) {
            double f = getFunction(t, flowState);
            double fPrime = getDerivative(t, flowState);

            // Update the guess using the Newton-Raphson formula
            double nextGuess = t - f / fPrime;

            if (Math.abs(nextGuess - t) < tolerance) {
                return nextGuess;
            }

            t = nextGuess;
        }

        return Double.NaN;
    }

    public static void main(String[] args) {
        CustomModel customModel = new CustomModel(7, 3, 0);
        double t = customModel.optimizeTaskTime();
        System.out.println(t);
    }
}