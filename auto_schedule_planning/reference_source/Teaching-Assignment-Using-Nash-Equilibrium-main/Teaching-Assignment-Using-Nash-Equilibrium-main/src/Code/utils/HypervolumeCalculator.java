/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.moeaframework.core.NondominatedPopulation;
import org.moeaframework.problem.AbstractProblem;
import org.moeaframework.core.Solution;
import org.moeaframework.core.indicator.Hypervolume;

/**
 *
 * @author tungd
 */
public class HypervolumeCalculator {

    public static ArrayList load_payoff(String algorithm, String file_name) throws FileNotFoundException, IOException {
        ArrayList<double[]> payoffs = new ArrayList<>();
        String workingDirectory = System.getProperty("user.dir");
        String dataDir = workingDirectory + "//result//" + algorithm + "//";
        String excelFilePath = dataDir + file_name;
        InputStream inputStream = new FileInputStream(new File(excelFilePath));
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = (Sheet) workbook.getSheetAt(0);

        for (int i = sheet.getLastRowNum(); i >= 1; i--) {
            double[] payoff = new double[26];
            for (int j = 0; j < 26; j++) {
                payoff[j] = sheet.getRow(i).getCell(j).getNumericCellValue();
            }
            payoffs.add(payoff);
        }

        return payoffs;
    }

    // solution1 is dominated by solution2
    public static boolean is_dominated(double[] solution1, double[] solution2) {
        for (int i = 0; i < solution1.length; i++) {
            if (solution1[i] > solution2[i]) {
                return false;
            }
        }
        return true;
    }

    public static boolean contain(ArrayList<double[]> list, double[] target) {
        for (double[] array : list) {
            if (Arrays.equals(array, target)) {
                return true;
            }
        }
        return false;
    }

    public static ArrayList findPareto(ArrayList<double[]> payoffs) {
        ArrayList<double[]> pareto = new ArrayList<>();
        for (int i = 0; i < payoffs.size(); i++) {
            boolean dominated = false;
            if (contain(pareto, payoffs.get(i))) {
                continue;
            }
            for (int j = 0; j < payoffs.size(); j++) {
                if (i == j) {
                    continue;
                }
                if (is_dominated(payoffs.get(i), payoffs.get(j))) {
                    dominated = true;
                    break;
                }
            }
            if (!dominated) {
                pareto.add(payoffs.get(i));
            }
        }
        return pareto;
    }

    public static double hypervolume_calculator(ArrayList<double[]> pareto, double[] MINIMUM, double[] MAXIMUM) {
        for (int i = 0; i < MAXIMUM.length; i++) {
            MAXIMUM[i] *= -1;
        }

        AbstractProblem problem = new AbstractProblem(0, pareto.get(0).length) {
            @Override
            public void evaluate(Solution sltn) {
            }

            @Override
            public Solution newSolution() {
                throw new UnsupportedOperationException("Not supported yet.");
            }
        };

        NondominatedPopulation np = new NondominatedPopulation();

        for (double[] point : pareto) {
            Solution solution = new Solution(point);
            for (int j = 0; j < point.length; j++) {
                solution.setObjective(j, -point[j]);
            }
            np.add(solution);
        }

        Hypervolume hp = new Hypervolume(problem, MAXIMUM, MINIMUM);
        double result = 0;
        try {
            result = hp.evaluate(np);
        } catch (Exception e) {
            System.out.println(e);
        }
        
        return result;
    }

    public static void main(String[] args) throws IOException {
        double[] MAXIMUM = new double[26];
        double[] MINIMUM = new double[26];
        MAXIMUM[0] = 1500;
        for (int i = 1; i <= 25; i++) {
            MAXIMUM[i] = 50;
        }
        
        ArrayList<double[]> payoffs = load_payoff("GA", "PayoffResult0.xlsx");

        ArrayList<double[]> pareto = findPareto(payoffs);
        System.out.println(pareto.size());

        double hypervolume = hypervolume_calculator(pareto, MINIMUM, MAXIMUM);
        System.out.println(hypervolume);
    }
}
