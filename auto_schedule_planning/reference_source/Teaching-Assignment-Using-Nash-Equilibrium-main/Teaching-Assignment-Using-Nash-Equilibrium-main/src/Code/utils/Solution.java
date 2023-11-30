/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author tungd
 */
public class Solution {

    // 3. An instructor cannot be assigned to teach different classes in the same time slot
    public static boolean pass_constraint_3(Data data, int[][] instructor_timeslot, int course, int instructor) {
        int time_slot_id = data.courses[course].getSlotId();
        return instructor_timeslot[instructor][time_slot_id] == 0;
    }

    // 4. Do not assign instructors to teach the subjects they have absolutely no interest in teaching
    public static boolean pass_constraint_4(Data data, int course, int instructor) {
        return data.E[instructor][course] != 0;
    }

    // 5. Do not assign an instructor to teach the subjects they cannot ensure the quantity
    public static boolean pass_constraint_5(Data data, int course, int instructor) {
        return data.F[instructor][course] != 0;
    }

    // 6. Do not assign an instructor to teach in time slots they cannot teach
    public static boolean pass_constraint_6(Data data, int course, int instructor) {
        return data.H[instructor][course] != 0;
    }

    // 7. Do not assign an instructor to teach fewer classes than the minimum number they are required to teach
    public static boolean pass_constraint_7(Data data, int[] instructor_total_course, int course, int instructor) {
        instructor_total_course[instructor] += 1;
        int total_course_need = 0;
        int total_assigned_course = 0;

        for (int i = 0; i < data.Ng; i++) {
            total_course_need += Integer.max(0, data.MinC[i] - instructor_total_course[i]);
            total_assigned_course += instructor_total_course[i];
        }

        int remain_course = data.Nc - total_assigned_course;
        instructor_total_course[instructor] -= 1;
        return total_course_need <= remain_course;
    }

    // 8. Do not assign an instructor to teach more classes than the maximum number they are allowed to teach
    public static boolean pass_constraint_8(Data data, int[] instructor_total_course, int course, int instructor) {
        return instructor_total_course[instructor] < data.MaxC[instructor];
    }

    public static boolean pass_all_constraint(Data data, int[] instructor_total_course, int[][] instructor_timeslot, int course, int instructor) {
        return pass_constraint_3(data, instructor_timeslot, course, instructor)
                && pass_constraint_4(data, course, instructor)
                && pass_constraint_5(data, course, instructor)
                && pass_constraint_6(data, course, instructor)
                && pass_constraint_7(data, instructor_total_course, course, instructor)
                && pass_constraint_8(data, instructor_total_course, course, instructor);
    }

    public boolean pass_all_constraint(Data data, int[] D) {
        int[] instructor_total_course = new int[data.Nc];
        int[][] instructor_timeslot = new int[data.Ng][data.Nt];

        for (int i = 0; i < data.Nc; i++) {
            int instructor = D[i];
            if (!pass_all_constraint(data, instructor_total_course, instructor_timeslot, i, instructor)) {
                return false;
            }
            instructor_total_course[instructor] += 1;
            int timeslot_id = data.courses[i].getSlotId();
            instructor_timeslot[instructor][timeslot_id] = 1;
        }
        return true;
    }

    // Generate new solution
    public static int[] initSolution(Data data) {
        int[] gen = new int[data.Nc];
        int[] instructor_total_course = new int[data.Ng];
        int[][] instructor_timeslot = new int[data.Ng][data.Nt];
        int random_instructor;

        for (int i = 0; i < data.Nc; i++) {
            DistributedRandomNumberGenerator rnd = new DistributedRandomNumberGenerator();
            for (int j = 0; j < data.Ng; j++) {
                if (pass_constraint_4(data, i, j) && pass_constraint_5(data, i, j)
                        && pass_constraint_6(data, i, j) && pass_constraint_3(data, instructor_timeslot, i, j)
                        && pass_constraint_8(data, instructor_total_course, i, j)) {
                    rnd.addNumber(j, 0.1);
                }
            }
            random_instructor = rnd.getDistributedRandomNumber();
            gen[i] = random_instructor;
            instructor_total_course[random_instructor] += 1;
            int timeslot_id = data.courses[i].getSlotId();
            instructor_timeslot[random_instructor][timeslot_id] = 1;
        }
        return gen;
    }

    public int[] level_subject_preference(Data data, int[] D) {
        int[] result = new int[data.Ng];
        for (int i = 0; i < data.Nc; i++) {
            result[D[i]] += data.E[D[i]][i];
        }
        return result;
    }

    public int[] level_timeslot_preference(Data data, int[] D) {
        int[] result = new int[data.Ng];
        for (int i = 0; i < data.Nc; i++) {
            result[D[i]] += data.H[D[i]][i];
        }
        return result;
    }

    public static double cal_payoff_p0(Data data, int[] D) {
        double payoff_p0 = 0;
        for (int i = 0; i < data.Nc; i++) {
            payoff_p0 += data.F[D[i]][i];
        }
        return payoff_p0;
    }

    public static double[] cal_payoff_pi(Data data, int[] D) {
        double w1 = 1.0 / 3.0;
        double w2 = 1.0 / 3.0;
        double w3 = 1.0 / 3.0;
        int instructor;
        double[] payoff_pi = new double[data.Ng];
        int[] instructor_total_course = new int[data.Ng];

        for (int i = 0; i < data.Nc; i++) {
            instructor = D[i];
            payoff_pi[instructor] += w1 * (double) data.E[instructor][i] + w2 * (double) data.H[instructor][i];
            instructor_total_course[instructor] += 1;
        }

        for (int i = 0; i < data.Ng; i++) {
            payoff_pi[i] += w3 * (10 - Math.abs(data.K[i] - instructor_total_course[i]));
        }

        return payoff_pi;
    }

    public static double getFitness(Data data, int[] chromosome) {
        double w1 = 1.0 / 3.0;
        double w2 = 1.0 / 3.0;
        double w3 = 1.0 / 3.0;
        double w4 = 0.5;
        double w5 = 0.5;
        double fitness = 0;
        int[] instructor_total_course = new int[data.Ng];
        int[][] instructor_timeslot = new int[data.Ng][data.Nt];
        boolean pass_contraint = true;

        for (int i = 0; i < data.Nc; i++) {
            int instructor = chromosome[i];
            if (!pass_all_constraint(data, instructor_total_course, instructor_timeslot, i, instructor)) {
                pass_contraint = false;
                break;
            }
            fitness += w4 * data.F[instructor][i] + w5 * (w1 * data.E[instructor][i] + w2 * data.H[instructor][i]);
            instructor_total_course[instructor] += 1;
            instructor_timeslot[instructor][data.courses[i].getSlotId()] = 1;
        }
        for (int i = 0; i < data.Ng; i++) {
            fitness += w5 * w3 * (10 - Math.abs(data.K[i] - instructor_total_course[i]));
        }
        if (!pass_contraint) {
            return fitness / 10000;
        }
        return fitness;
    }

    public static void writeSolutions(ArrayList<int[]> solutions, Data data, String algorithm, String sheetName) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet(sheetName);

        Row row = sheet.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("PayOff P0");
        for (int i = 1; i <= data.Ng; i++) {
            cell = row.createCell(i);
            cell.setCellValue("PayOff P" + i);
        }
        
        for (int i = 0; i < data.Nc; i++) {
            cell = row.createCell(27+i);
            cell.setCellValue("Course" + i);
        }
        cell = row.createCell(data.Nc + data.Ng + 2);
        cell.setCellValue("Fitness");

        int rowCount = 0;

        for (int[] s : solutions) {
            row = sheet.createRow(++rowCount);

            cell = row.createCell(0);
            cell.setCellValue(Solution.cal_payoff_p0(data, s));
            double[] payoff_pi = Solution.cal_payoff_pi(data, s);
            for (int i = 1; i <= data.Ng; i++) {
                cell = row.createCell(i);
                cell.setCellValue(payoff_pi[i - 1]);
            }
            
            for (int i = 0; i < data.Nc; i++) {
                cell = row.createCell(27 + i);
                cell.setCellValue(s[i]);
            }
            cell = row.createCell(data.Nc + data.Ng + 2);
            cell.setCellValue(Solution.getFitness(data, s));
        }
        try (FileOutputStream outputStream = new FileOutputStream("result//" + algorithm + "//" + sheetName + ".xlsx")) {
            workbook.write(outputStream);
            outputStream.close();
        }
    }
}
