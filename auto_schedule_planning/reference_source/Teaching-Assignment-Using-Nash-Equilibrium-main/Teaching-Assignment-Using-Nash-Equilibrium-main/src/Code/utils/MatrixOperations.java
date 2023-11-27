/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.utils;

/**
 *
 * @author tungd
 */
public class MatrixOperations {

    // Function to transpose a matrix
    public static int[][] transpose(int[][] matrix) {
        int numRows = matrix.length;
        int numCols = matrix[0].length;
        int[][] result = new int[numCols][numRows];

        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                result[j][i] = matrix[i][j];
            }
        }

        return result;
    }

    // Function to multiply two matrices
    public static int[][] multiply(int[][] matrixA, int[][] matrixB) {
        int numRowsA = matrixA.length;
        int numColsA = matrixA[0].length;
        int numRowsB = matrixB.length;
        int numColsB = matrixB[0].length;

        if (numColsA != numRowsB) {
            throw new IllegalArgumentException("Matrix dimensions are not compatible for multiplication.");
        }

        int[][] result = new int[numRowsA][numColsB];

        for (int i = 0; i < numRowsA; i++) {
            for (int j = 0; j < numColsB; j++) {
                int sum = 0;
                for (int k = 0; k < numColsA; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                result[i][j] = sum;
            }
        }

        return result;
    }
    
    public static double[][] add(double[][] matrix1, double[][] matrix2) {
        int rows = matrix1.length;
        int columns = matrix1[0].length;
        
        double[][] result = new double[rows][columns];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                result[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }

        return result;
    }
    
    
    public static void print(int[][] matrix){
        int numRows = matrix.length;
        int numCols = matrix[0].length;
        
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println("");
        }
    }
    
    public static void print(double[][] matrix){
        int numRows = matrix.length;
        int numCols = matrix[0].length;
        
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println("");
        }
    }
}

