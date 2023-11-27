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
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author tungd
 */
public class Data {
    public int Nc; // Number of course
    public int Ns; // Number of subject
    public int Ng; // Number of instructor
    public int Nt; // Number of timeslot
    public int[][] A; // Preference of instructor for subject
    public int[][] B; // Teaching quantity of instructor
    public int[][] C; // Preference of instructor for timeslot
    public int[][] E; // Preference in terms of subjects of instructor for course
    public int[][] F; // Teaching quantity of instructor for course
    public int[][] H; // Preference in terms of timeslot of instructor for course
    public int[][] S; 
    public int[][] T;
    public int[] MinC; // Min class of each instructor
    public int[] MaxC; // Max class of each instructor
    public int[] K; // Ideal class of each instructor
    public Instructor[] instructors;
    public Course[] courses;
    
    public Data(int Nc, int Ns, int Ng, int Nt){
        this.Nc = Nc;
        this.Ns = Ns;
        this.Ng = Ng;
        this.Nt = Nt;
        A = new int[Ng][Ns]; // Preference of instructor for subject
        B = new int[Ng][Ns]; // Teaching quantity of instructor
        C = new int[Ng][Nt]; // Preference of instructor for timeslot
        E = new int[Ng][Nc]; // Preference in terms of subjects of instructor for course
        F = new int[Ng][Nc]; // Teaching quantity of instructor for course
        H = new int[Ng][Nc]; // Preference in terms of timeslot of instructor for course
        S = new int[Nc][Ns]; 
        T = new int[Nc][Nt];
        MinC = new int[Ng]; // Min class of each instructor
        MaxC = new int[Ng]; // Max class of each instructor
        K = new int[Ng]; // Ideal class of each instructor
        instructors = new Instructor[Ng];
        courses = new Course[Nc];
    }
    
    public static Sheet loadData(String fileName, int sheetNum) throws FileNotFoundException, IOException{
        String workingDirectory = System.getProperty("user.dir");
        String dataDir = workingDirectory + "//data//";
        String excelFilePath = dataDir + fileName;
        InputStream inputStream = new FileInputStream(new File(excelFilePath));
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = (Sheet) workbook.getSheetAt(sheetNum);
        return sheet;
    }
    
    public static Data readDataFromFrile() throws IOException{
        Sheet subjects = loadData("data_Sub.xlsx", 0);
        Sheet instructors = loadData("data_T.xlsx", 0);
        Sheet courses = loadData("sp22_to_import.xlsx", 0);
        Sheet instructor_timeslot_preference = loadData("data_FSlot_T.xlsx", 0);
        Sheet instructor_subject_preference = loadData("data_FSlot_S.xlsx", 1);
        Sheet teaching_quantity = loadData("data_Rating.xlsx", 0);
        
        int Nc = courses.getLastRowNum();
        int Ns = subjects.getLastRowNum();
        int Ng = instructors.getLastRowNum();
        int Nt = instructor_timeslot_preference.getRow(0).getLastCellNum() - 1;
        
        Data data = new Data(Nc, Ns, Ng, Nt);
        
        for (int i = 1; i <= data.Ng; i++) {
            int id = i-1;
            String name = instructors.getRow(i).getCell(1).toString();
            double salary_level = (double) instructors.getRow(i).getCell(2).getNumericCellValue();
            int min_class = (int) instructors.getRow(i).getCell(3).getNumericCellValue();
            data.MinC[i-1] = min_class;
            int max_class = (int) instructors.getRow(i).getCell(4).getNumericCellValue();
            data.MaxC[i-1] = max_class;
            int ideal_class = (int) instructors.getRow(i).getCell(5).getNumericCellValue();
            data.K[i-1] = ideal_class;
            data.instructors[i-1] = new Instructor(id, name, salary_level, min_class, max_class, ideal_class);
        }
        
        for (int i = 0; i < data.Ng; i++) {
            for (int j = 0; j < data.Nt; j++) {
                data.C[i][j]= (int) instructor_timeslot_preference.getRow(i + 1).getCell(j + 1).getNumericCellValue();
            }
        }
        
        for (int i = 0; i < data.Ng; i++) {
            for (int j = 0; j < data.Ns; j++) {
                data.B[i][j] = (int) teaching_quantity.getRow(i + 1).getCell(j + 1).getNumericCellValue();
            }
        }
        
        for (int i = 0; i < data.Ng; i++) {
            for (int j = 0; j < data.Ns; j++) {
                data.A[i][j] = (int) instructor_subject_preference.getRow(i + 1).getCell(j + 1).getNumericCellValue();
            }
        }
        
        for (int i = 1; i <= data.Nc; i++) {
            int courseId = (int) courses.getRow(i).getCell(0).getNumericCellValue();
            String className = courses.getRow(i).getCell(1).toString();
            String subjectName = courses.getRow(i).getCell(2).toString();
            int subjectId = (int) courses.getRow(i).getCell(3).getNumericCellValue();
            int slotId = (int) courses.getRow(i).getCell(5).getNumericCellValue();
            String room = courses.getRow(i).getCell(7).toString();
            data.S[courseId][subjectId] = 1;
            data.T[courseId][slotId] = 1;
            data.courses[i-1] = new Course(courseId, className, subjectName, subjectId, slotId, room);
        }
        int[][] S_transpose = MatrixOperations.transpose(data.S);
        data.E = MatrixOperations.multiply(data.A, S_transpose);
        data.F = MatrixOperations.multiply(data.B, S_transpose);
        data.H = MatrixOperations.multiply(data.C, MatrixOperations.transpose(data.T));
        
        return data;
    }
}
