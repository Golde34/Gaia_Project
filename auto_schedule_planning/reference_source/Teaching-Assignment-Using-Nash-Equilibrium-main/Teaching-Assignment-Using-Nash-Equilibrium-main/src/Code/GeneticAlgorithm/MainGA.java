/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.GeneticAlgorithm;

import Code.utils.Data;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author tungd
 */
public class MainGA {

    public static void main(String[] args) throws IOException {
        Data data = Data.readDataFromFrile();
        int numberPopulation = 500;
        int numberIteration = 10000;
        int numberCrossOver =450;
        int numberMutation = 50;
        GeneticAlgorithm geneticAlgorithm = new GeneticAlgorithm(data, numberPopulation, numberIteration, numberCrossOver, numberMutation);
        GAImplement gaImplement = new GAImplement();
        // Run many times to gen diffrent results
        int numberRunTime = 1;
        for (int i = 0; i < numberRunTime; i++) {
            ArrayList gaResults = gaImplement.implement(geneticAlgorithm);
//            Solution.writeSolutions(ga_results, data, "GA", "PayoffResult" + i);
        }
    }
}
