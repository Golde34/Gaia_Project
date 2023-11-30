/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.GeneticAlgorithm;

import Code.utils.Solution;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Random;

/**
 *
 * @author tungd
 */
public class GAImplement {

    public GAImplement() {
    }

    public ArrayList<int[]> implement(GeneticAlgorithm ga) {
        ArrayList<int[]> result = new ArrayList<>();

        ArrayList<int[]> currentGeneration = initPopulation(ga);

        // Sort by decreasing of fitness
        currentGeneration = sortGeneration(currentGeneration, ga);
        // Add best result to the list
        result.add(currentGeneration.get(0));

        result = iterationGeneration(currentGeneration, result, ga);

        return result;
    }

    public ArrayList<int[]> initPopulation(GeneticAlgorithm ga) {
        ArrayList<int[]> pop = new ArrayList<>();
        for (int i = 0; i < ga.getNumberPopulation(); i++) {
            pop.add(Solution.initSolution(ga.getData()));
        }
        return pop;
    }

    private ArrayList<int[]> iterationGeneration(ArrayList<int[]> currentGeneration, ArrayList<int[]> result, GeneticAlgorithm ga) {
        Random random = new Random();
        int randomNum1, randomNum2;
        // iteration
        for (int j = 0; j < ga.getNumberIteration(); j++) {
            // Selection keep top 30 best solutions to new generation
            ArrayList<int[]> next_generation = new ArrayList<>();

            for (int i = 0; i < ga.getNumberPopulation() - ga.getNumberCrossOver(); i++) {
                next_generation.add(currentGeneration.get(i));
            }

            // Crossover to create new n_crossover chormosome
            for (int i = 0; i < ga.getNumberCrossOver(); i++) {
                randomNum1 = random.nextInt(ga.getNumberPopulation());
                do {
                    randomNum2 = random.nextInt(ga.getNumberPopulation());
                } while (randomNum1 == randomNum2);
                int[] p1 = currentGeneration.get(randomNum1);
                int[] p2 = currentGeneration.get(randomNum2);
                next_generation.add(crossover(p1, p2, ga));
            }

            // Sort next generation by fitness decreasing
            sortGeneration(next_generation, ga);

            // Mutation n_mutation chromosome which not in 25 best chromosome
            for (int i = 0; i < ga.getNumberMutation(); i++) {
                randomNum1 = random.nextInt(ga.getNumberPopulation() - 25) + 25;
                next_generation.set(randomNum1, mutate(next_generation.get(randomNum1), ga));
            }

            // Sort next generation by fitness decreasing
            sortGeneration(next_generation, ga);

            double cur_best_fitness = Solution.getFitness(ga.getData(), next_generation.get(0));
            double prev_best_fitness = Solution.getFitness(ga.getData(), result.get(result.size() - 1));
            // Add best solution to result
            if (prev_best_fitness <= cur_best_fitness) {
                System.out.println("Generation: " + j + " - Fitness: " + cur_best_fitness);
                result.add(next_generation.get(0));
            } else {
                System.out.println("Generation: " + j + " - Fitness: " + prev_best_fitness);
                result.add(result.get(result.size() - 1));
            }
            currentGeneration.clear();
            currentGeneration = new ArrayList<>(next_generation);
        }
        int[] best_chromosome = result.get(result.size() - 1);
        System.out.println(Solution.getFitness(ga.getData(), best_chromosome));
        for (int i : best_chromosome) {
            System.out.print(i + ", ");
        }
        return result;
    }

    // Crossover parents to a new Solution
    public int[] crossover(int[] p1, int[] p2, GeneticAlgorithm ga) {
        int[] child = new int[ga.getData().Nc];

        //Cut off Mom and Dad Solutions at middle veritcally, combine Mom 1st half and Dad 2nd half to new Chromosome
        for (int i = 0; i < ga.getData().Nc / 2; i++) {
            child[i] = p1[i];
            child[ga.getData().Nc - i - 1] = p2[ga.getData().Nc - i - 1];
        }
        child[ga.getData().Nc / 2] = p1[ga.getData().Nc / 2];
        return child;
    }

    // Mutate by swap random 2 course
    public int[] mutate(int[] c, GeneticAlgorithm ga) {
        Random random = new Random();
        int course1 = random.nextInt(ga.getData().Nc);
        int course2;
        do {
            course2 = random.nextInt(ga.getData().Nc);
        } while (course2 == course1);
        int temp = c[course1];
        c[course2] = c[course1];
        c[course1] = temp;
        return c;
    }

    public ArrayList<int[]> sortGeneration(ArrayList<int[]> currentGeneration, GeneticAlgorithm ga) {
        Collections.sort(currentGeneration, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                return -Double.compare(Solution.getFitness(ga.getData(), o1), Solution.getFitness(ga.getData(), o2));
            }
        });
        return currentGeneration;
    }
}
