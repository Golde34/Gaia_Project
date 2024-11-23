package wo.work_optimization.infrastructure.algorithm.custom;

import java.util.stream.IntStream;

import org.apache.commons.math3.linear.*;

import org.springframework.stereotype.Component;

@Component
public class CustomConstantUpdating {

    public RealVector solve(double[] E, double[] beta, RealVector constantVector) {
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

    public RealVector getConstantVector(double c1, double c2, double c3) {
        return new ArrayRealVector(new double[] {c1, c2, c3});
    }
}
