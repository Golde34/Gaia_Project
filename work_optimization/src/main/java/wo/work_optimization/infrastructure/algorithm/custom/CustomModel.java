package wo.work_optimization.infrastructure.algorithm.custom;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.math3.analysis.MultivariateFunction;
import org.apache.commons.math3.optim.InitialGuess;
import org.apache.commons.math3.optim.MaxEval;
import org.apache.commons.math3.optim.nonlinear.scalar.GoalType;
import org.apache.commons.math3.optim.nonlinear.scalar.ObjectiveFunction;
import org.apache.commons.math3.optim.nonlinear.scalar.noderiv.NelderMeadSimplex;
import org.apache.commons.math3.optim.nonlinear.scalar.noderiv.SimplexOptimizer;

import java.util.Arrays;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.IntStream;

@Getter
@Setter
public class CustomModel {
    private double c1; // Constant 1
    private double c2; // Constant 2
    private double c3; // Constant 3

    private double maximumWorkTime; // Maximum Work Time
    private double[] effort; // 1 <= E <= 5
    private double[] enjoyability; // 1 <= B <= 2
    private int taskLength;

    private double[] p0;
    private double[] k;
    private double[] alpha;
    private double[] phi;

    public CustomModel(double c1, double c2, double c3, double[] effort,
            double[] enjoyability, double maximumWorkTime, int taskLength) {
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.effort = convertEffortValues(effort);
        this.enjoyability = convertEnjoyabilityValues(enjoyability);
        this.maximumWorkTime = maximumWorkTime;
        this.taskLength = taskLength;
        this.p0 = this.calculateInitialProductivity(this.effort, this.enjoyability);
        this.k = this.calculateK(this.effort, this.enjoyability);
        this.alpha = this.calculateAlpha(this.effort, this.enjoyability);
        this.phi = this.calculateFlowState(this.effort, this.enjoyability);
    }

    private double[] convertEffortValues(double[] effort) {
        return Arrays.stream(effort).map(v -> v * 4 / 9 + 5f / 9).toArray();
    }

    private double[] convertEnjoyabilityValues(double[] enjoyability) {
        return Arrays.stream(enjoyability).map(v -> v / 9 + 8f / 9).toArray();
    }

    /**
     * Calculate productivity curve function by time input
     *
     * @param p0    initialProductivity
     * @param alpha alpha
     * @param k     1 / flowState
     * @param t     time
     * @return productivityCurveMaxValue
     */
    public double calculateProductivityCurve(double p0, double alpha, double k, double t) {
        return p0 + alpha * t * Math.exp(k * -1);
    }

    private double[] calculateFlowState(double[] effort, double[] enjoyability) {
        return IntStream.range(0, taskLength).mapToDouble(
                i -> c1 * effort[i] + c2 * enjoyability[i] + c3).toArray();
    }

    private double[] calculateK(double[] effort, double[] enjoyability) {
        return IntStream.range(0, taskLength).mapToDouble(
                i -> 1 / (c1 * effort[i] + c2 * enjoyability[i] + c3)).toArray();
    }

    private double[] calculateInitialProductivity(double[] effort, double[] enjoyability) {
        return IntStream.range(0, taskLength).mapToDouble(
                i -> Math.pow(enjoyability[i], 2) / Math.pow(effort[i], 2)).toArray();
    }

    private double[] calculateAlpha(double[] effort, double[] enjoyability) {
        return IntStream.range(0, taskLength).mapToDouble(
                i -> Math.pow(enjoyability[i], 2) * Math.log(effort[i]) + Math.pow(enjoyability[i], 2)).toArray();
    }

    /**
     * When to stop doing a task
     * Measure the best time to do a task, that time to execute task not too long
     * that you will burn out
     * or not too short that you not get enough value to your task
     *
     * @param alpha     alpha
     * @param flowState flowState
     * @return time
     */
    public double getMaximumDeepWorkTimePerTask(double alpha, double flowState) {
        double t = 1;
        int maxIterations = 1000;
        double tolerance = 1e-6;

        for (int i = 0; i < maxIterations; i++) {
            double f = getFunction(t, flowState, alpha);
            double fPrime = getDerivative(t, flowState, alpha);

            // Update the guess using the Newton-Raphson formula
            double nextGuess = t - f / fPrime;
            if (Math.abs(nextGuess - t) < tolerance) {
                return nextGuess;
            }
            t = nextGuess;
        }

        return Double.NaN;
    }

    private double getFunction(double t, double flowState, double alpha) {
        return alpha * Math.exp(-t / flowState) * (Math.pow(t, 2) / Math.pow(flowState, 2) + t / flowState + 1) - alpha;
    }

    private double getDerivative(double t, double flowState, double alpha) {
        return -alpha * Math.exp(-t / flowState) * (2 * t / Math.pow(flowState, 3) + 1 / Math.pow(flowState, 2));
    }

    /**
     * Optimize the time allocation for each task
     * Using Zenith gradient algorithm
     */
    public void optimize() {
        double[] initialT = new double[taskLength];
        for (int i = 0; i < taskLength; i++) {
            initialT[i] = maximumWorkTime / taskLength;
        }

        SimplexOptimizer optimizer = new SimplexOptimizer(1e-6, 1e-6);
        double[] optimizedT = optimizer.optimize(
                new ObjectiveFunction(new ProductivityFunction(p0, alpha, k)),
                new InitialGuess(initialT),
                GoalType.MAXIMIZE,
                new NelderMeadSimplex(taskLength), // taskLength-dimensional simplex
                new MaxEval(1000)).getPoint();

        AtomicReference<Double> sum = new AtomicReference<>((double) 0);
        System.out.println("Optimized Time Allocation:");

        IntStream.range(0, taskLength)
                .forEach(index -> {
                    System.out.printf("Productivity Curve: %s + %s * t * e ^ -(%s * t)%n", p0[index], alpha[index],
                            k[index]);
                    System.out.println("Productivity Curve value: "
                            + calculateProductivityCurve(p0[index], alpha[index], k[index], optimizedT[index]));
                    System.out.println("Average stop time: " + getMaximumDeepWorkTimePerTask(alpha[index], phi[index]));
                    System.out.println("Final T: " + optimizedT[index]);
                    sum.updateAndGet(v -> v + optimizedT[index]);
                });
        System.out.println("Sum: " + sum);
    }

    private double lagrangeFunction(double p0, double alpha, double k, double t) {
        return (p0 * Math.pow(k, 2) * t - alpha * Math.exp(-k * t) * (k * t + 1) + alpha) / (Math.pow(k, 2) * t);
    }

    class ProductivityFunction implements MultivariateFunction {
        double[] p0, a, k;
        double T = 6.0; // Tổng thời gian sẵn có

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
                double productivity = lagrangeFunction(p0[i], a[i], k[i], t[i]);
                sum += productivity;
            }
            return sum;
        }
    }

    // public static void main(String[] args) {
    // double[] effort = {3, 6, 4, 8, 7}; // Khởi tạo mảng p0
    // double[] enjoyability = {2, 5, 4, 3, 3}; // Khởi tạo mảng k1
    // double T = 6; // Tổng thời gian có sẵn
    // int taskLength = effort.length;

    // CustomModel customModel = new CustomModel(effort, enjoyability, T,
    // taskLength);
    // customModel.optimize();
    // }
}
