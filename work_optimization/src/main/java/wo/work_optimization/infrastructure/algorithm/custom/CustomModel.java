package wo.work_optimization.infrastructure.algorithm.custom;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.math3.analysis.MultivariateFunction;
import org.apache.commons.math3.optim.InitialGuess;
import org.apache.commons.math3.optim.MaxEval;
import org.apache.commons.math3.optim.SimpleValueChecker;
import org.apache.commons.math3.optim.nonlinear.scalar.GoalType;
import org.apache.commons.math3.optim.nonlinear.scalar.ObjectiveFunction;
import org.apache.commons.math3.optim.nonlinear.scalar.gradient.NonLinearConjugateGradientOptimizer;
import org.apache.commons.math3.optim.nonlinear.scalar.gradient.NonLinearConjugateGradientOptimizer.Formula;
import org.apache.commons.math3.optim.nonlinear.scalar.noderiv.NelderMeadSimplex;
import org.apache.commons.math3.optim.nonlinear.scalar.noderiv.SimplexOptimizer;

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
        calculateInitialProductivity();
        calculateAlpha();
        calculateK(t);
        return this.p0 + this.alpha * t * Math.exp(this.k * -1);
    }

    public double optimizeTaskTime() {
//        defineInputBoundary();
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

//    public static void main(String[] args) {
//        CustomModel customModel = new CustomModel(4.11, 1.22, 0);
//        double t = customModel.optimizeTaskTime(); // Max time được thực hiện task
//        System.out.println(t);
//        double pt = customModel.calculateProductivityCurve(t);
//        System.out.println(pt);
//        System.out.println(0.8215125208403288 + 2.156742825380549 + 1.2862060639064254 + 2.2415182525369306);
//    }




    public static void main(String[] args) {
        double[] p0 = {0.34, 0.20, 0.33, 0.09}; // Khởi tạo mảng p0
        double[] k = {1.26, 0.69, 1.01, 0.50}; // Khởi tạo mảng k1
        double[] a = {2.02, 4.50, 3.27, 3.57};  // Khởi tạo mảng a
        double T = 6;                          // Tổng thời gian có sẵn

        // Khởi tạo mảng t ban đầu
        double[] initialT = {T / 4, T / 4, T / 4, T / 4};

        SimplexOptimizer optimizer = new SimplexOptimizer(1e-6, 1e-6);
        double[] optimizedT = optimizer.optimize(
                new ObjectiveFunction(new ProductivityFunction(p0, a, k)),
                new InitialGuess(initialT),
                GoalType.MAXIMIZE,
                new NelderMeadSimplex(4), // 4-dimensional simplex
                new MaxEval(1000)
        ).getPoint();

        double sum = 0;
        System.out.println("Optimized Time Allocation:");
        for (double t : optimizedT) {
            System.out.println(t);
            sum += t;
        }
        System.out.println("Sum: " + sum);
    }
    static class ProductivityFunction implements MultivariateFunction {
        double[] p0, a, k;
        double T = 6.0;  // Tổng thời gian sẵn có

        public ProductivityFunction(double[] p0, double[] a, double[] k) {
            this.p0 = p0;
            this.a = a;
            this.k = k;
        }

        @Override
        public double value(double[] t) {
            double sum = 0;
            double lastT = T;
            for (int i = 0; i < t.length - 1; i++) {
                lastT -= t[i];
            }
            t[t.length - 1] = lastT; // Đảm bảo tổng thời gian là T
            for (int i = 0; i < t.length; i++) {
                double productivity = (p0[i] * Math.pow(k[i], 2) * t[i] - a[i] * Math.exp(-k[i] * t[i]) * (k[i] * t[i] + 1) + a[i]) / (Math.pow(k[i], 2) * t[i]);
                sum += productivity;
            }
            return sum;
        }
    }
}
// 0.8215125208403288
// 2.156742825380549
// 1.2862060639064254
// 2.2415182525369306