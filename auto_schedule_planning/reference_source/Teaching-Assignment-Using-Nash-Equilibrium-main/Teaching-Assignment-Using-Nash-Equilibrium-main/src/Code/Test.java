package Code;

import java.io.IOException;
import java.util.ArrayList;
import org.moeaframework.algorithm.NSGAII;
import org.moeaframework.core.NondominatedPopulation;
import org.moeaframework.core.PopulationIO;
import org.moeaframework.problem.DTLZ.DTLZ2;
import org.moeaframework.problem.ZDT.ZDT1;
import org.moeaframework.core.Problem;
import org.moeaframework.core.Solution;
import org.moeaframework.core.indicator.GenerationalDistance;
import org.moeaframework.core.indicator.Hypervolume;


/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author tungd
 */
public class Test {
    public static void main(String[] args) throws IOException {
        int[] x = {1, 2, 3};
        int[] y = {1, 2, 3};
        ArrayList lst = new ArrayList();
        lst.add(x);
        System.out.println(lst.contains(y));
    }
}
