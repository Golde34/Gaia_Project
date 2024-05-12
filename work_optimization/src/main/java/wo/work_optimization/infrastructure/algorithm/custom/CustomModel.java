package wo.work_optimization.infrastructure.algorithm.custom;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomModel {
    private final double c1 = 0.56;     // Constant 1
    private final double c2 = -0.24;    // Constant 2
    private final double c3 = 0;        // Constant 3

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
        defineInputBoundary();
        return c1*this.effort + c2*this.enjoyability + c3;
    }

    private double calculateInitialProductivity() {
        return Math.pow(this.enjoyability, 2) / Math.pow(this.effort, 2);
    }

    private double calculateAlpha() {
        return Math.pow(this.enjoyability, 2) * Math.log(this.effort)+ Math.pow(this.enjoyability, 2);
    }

    public double calculateProductivityCurve(double t) {
        // Initial productivity
        double p0 = calculateInitialProductivity();
        // derivative score
        double k = -(double) (t / calculateFlowState());
        // Model score
        double alpha = calculateAlpha();
        return p0 + alpha * t * Math.exp(k);
    }

    public double solveIntegral() {
        double a = solveEquation();
        return a * calculateFlowState();
    }

    public double solveEquation() {
        double initialGuess = 1.75f; // Initial guess for a
        double tolerance = 0.000001; // Tolerance level for convergence

        // Call the Newton-Raphson method to find the root
        double solution = newtonRaphson(initialGuess, tolerance);
        System.out.println(solution);
        return solution;
    }
    // Define the function f(a) = e^(-a) - (a^2 + a + 1)
    public static double f(double a) {
        return Math.exp(-a) - (a * a + a + 1);
    }

    // Define the derivative of the function f'(a) = -e^(-a) - 2a - 1
    public static double df(double a) {
        return -Math.exp(-a) - 2 * a - 1;
    }

    // Implement the Newton-Raphson method
    public static double newtonRaphson(double initialGuess, double tolerance) {
        double a = initialGuess;
        double aPrev;

        do {
            aPrev = a;
            a = a - f(a) / df(a);
            double temp = Math.abs(a - aPrev);
            System.out.println(temp);
        } while (Math.abs(a - aPrev) > tolerance);

        return a;
    }

    public static void main(String[] args) {
        CustomModel customModel = new CustomModel(7, 3, 0);
        double t = customModel.solveIntegral();
        System.out.println(t);
    }
}
