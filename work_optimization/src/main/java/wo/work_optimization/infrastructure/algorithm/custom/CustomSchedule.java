package wo.work_optimization.infrastructure.algorithm.custom;

public class CustomSchedule {
    private final double c1 = 0.56;     // Constant 1
    private final double c2 = -0.24;    // Constant 2
    private final double c3 = 0;        // Constant 3

    private double t;                   // Time
    private double effort;              // 1 <= E <= 5
    private double enjoyability;        // 1 <= B <= 2

    public CustomSchedule(double effort, double enjoyability, double t) {
        this.effort = effort;
        this.enjoyability = enjoyability;
        this.t = t;
    }

    public double getEffort() {
        return effort;
    }

    public void setEffort(double effort) {
        this.effort = effort;
    }

    public double getEnjoyability() {
        return enjoyability;
    }

    public void setEnjoyability(double enjoyability) {
        this.enjoyability = enjoyability;
    }

    private void defineInputBoundary() {
        setEnjoyability(getEnjoyability()/9 + 8f/9);
        setEffort(getEffort()*4/9 + 5f/9);
    }

    private double calculateFlowState() {
        return c1*this.effort + c2*this.enjoyability + c3;
    }

    private double calculateInitialProductivity() {
        return Math.pow(this.enjoyability, 2) / Math.pow(this.effort, 2);
    }

    private double calculateAlpha() {
        return Math.pow(this.enjoyability, 2) * Math.log(this.effort)+ Math.pow(this.enjoyability, 2);
    }

    public double calculateModel() {
        defineInputBoundary();
        // Initial productivity
        double p0 = calculateInitialProductivity();
        // derivative score
        double k = -(this.t / calculateFlowState());
        // Model score
        double alpha = calculateAlpha();
        return p0 + alpha * this.t * Math.exp(k);
    }
}
