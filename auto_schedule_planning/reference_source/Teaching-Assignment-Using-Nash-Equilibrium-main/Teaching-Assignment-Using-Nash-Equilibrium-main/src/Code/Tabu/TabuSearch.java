package Code.Tabu;

import Code.utils.Data;
import Code.utils.Solution;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author tungd
 */
public class TabuSearch {
    Data data;
    int max_iter;
    int max_tabu_size;
    int neighbors_size;

    public TabuSearch(Data data, int max_iter, int max_tabu_size, int neighbors_size) {
        this.data = data;
        this.max_tabu_size = max_tabu_size;
        this.max_iter = max_iter;
        this.neighbors_size = neighbors_size;
    }
    
    public boolean contain(ArrayList<int[]> list, int[] target){
        for (int[] array : list) {
            if (Arrays.equals(array, target)) {
                return true;
            }
        }
        return false;
    }
    
    public ArrayList get_neighbors_best(int[] solution){
        ArrayList<int[]> neighbors = new ArrayList();
        Random rnd = new Random();
        for (int i = 0; i < data.Nc; i++) {
            for (int j = 0; j < data.Nc; j++) {
                if (rnd.nextInt(0, data.Nc) != 0){
                    continue;
                }
                int[] tmp_solution = solution.clone();
                int tmp = tmp_solution[i];
                tmp_solution[i] = tmp_solution[j];
                tmp_solution[j] = tmp;
                
                for (int k = 0; k < data.Ng; k++) {
                    int[] tmp_tmp_solution = tmp_solution.clone();
                    tmp_tmp_solution[i] = k;
                    neighbors.add(tmp_tmp_solution);
                }
            }
        }
        return neighbors;
    }
    
    public ArrayList get_neighbors(int[] solution){
        ArrayList<int[]> neighbors = new ArrayList<>();
        Random rnd = new Random();
        int course1, course2;
        
        for (int i = 0; i < neighbors_size; i++) {
            do {
                course1 = rnd.nextInt(data.Nc);
                course2 = rnd.nextInt(data.Nc);
            } while (course1 == course2);
             int[] tmp_solution = solution.clone();
            int tmp = tmp_solution[course1];
            tmp_solution[course1] = tmp_solution[course2];
            tmp_solution[course2] = tmp;
            tmp_solution[course1] = rnd.nextInt(data.Ng);
            neighbors.add(tmp_solution);
        }
        
        return neighbors;
    }
    
    public ArrayList<int[]> implement(){
        int[] initial_solution = Solution.initSolution(data);
        int[] best_solution = initial_solution;
        double best_solution_fitness = Solution.getFitness(data, best_solution);
        int[] cur_solution = initial_solution;
        
        ArrayList<int[]> tabuList = new ArrayList();
        ArrayList<int[]> result = new ArrayList();
        
        for (int i = 0; i < max_iter; i++){
            ArrayList<int[]> neighbors = get_neighbors(cur_solution);
            int[] best_neighbor = null;
            double best_neighbor_fitness = Double.MIN_VALUE;
            
            for (int[] neighbor : neighbors) {
                if(!contain(tabuList, neighbor)){
                    double neighbor_fitness = Solution.getFitness(data, neighbor);
                    if (neighbor_fitness > best_neighbor_fitness){
                        best_neighbor = neighbor.clone();
                        best_neighbor_fitness = neighbor_fitness;
                    }
                }
            }
            
            // No non-tabu neighbors found, terminate search
            if (best_neighbor == null){
                break;
            }
            
            cur_solution = best_neighbor.clone();
            tabuList.add(best_neighbor);
            result.add(best_neighbor);
            
            if (tabuList.size() > max_tabu_size){
                tabuList.remove(0);
            }
            
            if (best_neighbor_fitness > best_solution_fitness){
                best_solution = best_neighbor.clone();
                best_solution_fitness = best_neighbor_fitness;
            }
            
            System.out.println("Iter: " + i + " - Cur Fitness: " + best_neighbor_fitness + " - Best Fitness: " + best_solution_fitness);
            
        }
        for (int i : best_solution) {
            System.out.print(i + ", ");
        }
        System.out.println("");
//        double payoff_p0 = Solution.cal_payoff_p0(data, best_solution);
//        System.out.println("Payoff P0: " + payoff_p0);
//        
//        double[] payoff_pi = Solution.cal_payoff_pi(data, best_solution);
//        for (int i = 0; i < payoff_pi.length; i++) {
//            System.out.println("Payoff P" + (i+1) + ": " + payoff_pi[i]);
//        }
        return result;
    }
}
