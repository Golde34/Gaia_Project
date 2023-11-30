/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.Tabu;

import Code.utils.Data;
import Code.utils.Solution;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author tungd
 */
public class MainTabu {
    
    
    public static void main(String[] args) throws IOException {
        Data data = Data.readDataFromFrile();
        int max_iteration = 3000;
        int max_tabu_size = 100;
        int neighbors_size = 5000;
        TabuSearch ts = new TabuSearch(data, max_iteration, max_tabu_size, neighbors_size);
        for (int i = 0; i < 1; i++) {
            ArrayList tabu_result = ts.implement();
//            Solution.writeSolutions(tabu_result, data, "Tabu", "PayoffResult" + i);
        }
    }
    
    
}
