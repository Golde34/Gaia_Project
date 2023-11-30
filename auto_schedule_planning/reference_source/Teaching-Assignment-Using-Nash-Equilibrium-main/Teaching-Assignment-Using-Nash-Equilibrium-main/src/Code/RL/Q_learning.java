/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.RL;

import Code.utils.Data;
import Code.utils.Solution;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 *
 * @author tungd
 */
public class Q_learning {

    Data data;
    int episodes;
    double alpha;
    int gamma;
    double epsilon;
    double max_epsilon;
    double min_epsilon;
    double epsilon_decay_rate;
    double bestFitness;
    int[] bestD;
    double[][] Q;

    public Q_learning(Data data, int episodes, double alpha, int gamma, double epsilon, double max_epsilon, double min_epsilon, double epsilon_decay_rate) {
        this.data = data;
        this.episodes = episodes;
        this.alpha = alpha;
        this.gamma = gamma;
        this.epsilon = epsilon;
        this.max_epsilon = max_epsilon;
        this.min_epsilon = min_epsilon;
        this.epsilon_decay_rate = epsilon_decay_rate;
        this.bestFitness = -999;
        this.bestD = new int[data.Nc];
        this.Q = new double[data.Nc][data.Ng];
    }

    public void reduceEpsilon(int episode) {
        epsilon = min_epsilon + (max_epsilon - min_epsilon) * Math.exp(-epsilon_decay_rate * episode);
    }

    public int explore_exploit(int[] instructor_total_course, int[][] instructor_timeslot, int state) {
        List<Integer> actionList = new ArrayList<>();
        for (int i = 0; i < data.Ng; i++) {
            actionList.add(i);
        }
        Random random = new Random();
        if (random.nextDouble() < epsilon) { // explore
            while (true) {
                int index = new Random().nextInt(actionList.size());
                int action = actionList.get(index);
                actionList.remove(index);

                if (Solution.pass_all_constraint(data, instructor_total_course, instructor_timeslot, state, state)) {
                    return action;
                } else {
                    Q[state][action] -= alpha;
                    if (actionList.isEmpty()) {
                        return -1;
                    }
                }
            }
        } else { // exploit
            int count = 25;
            while (true) {
                int action = 0;
                double maxQ = Q[state][0];
                for (int i = 1; i < data.Ng; i++) {
                    if (Q[state][i] > maxQ) {
                        action = i;
                        maxQ = Q[state][i];
                    }
                }

                if (Solution.pass_all_constraint(data, instructor_total_course, instructor_timeslot, state, state)) {
                    return action;
                } else {
                    Q[state][action] -= alpha;
                    if (count == 0) {
                        return -1;
                    }
                }
                count--;
            }
        }
    }

    public double getFitness(int[] D, int[] instructor_total_course, int state) {
        double w1 = 1.0 / 3.0;
        double w2 = 1.0 / 3.0;
        double w3 = 1.0 / 3.0;
        double w4 = 0.5;
        double w5 = 0.5;
        double fitness = 0;

        for (int i = 0; i < state; i++) {
            fitness += w4 * data.F[D[i]][i] + w5 * (w1 * data.E[D[i]][i] + w2 * data.H[D[i]][i]);
        }
        for (int i = 0; i < data.Ng; i++) {
            fitness += w5 * w3 * (10 - Math.abs(data.K[i] - instructor_total_course[i]));
        }
        return fitness;
    }

    public ArrayList<int[]> implement() {
        ArrayList<int[]> result = new ArrayList<>();
        
        for (int episode = 0; episode < episodes; episode++) {
            boolean done = false;
            int state = 0;
            int[] D = new int[data.Nc];
            int[] instructor_total_course = new int[data.Ng];
            int[][] instructor_timeslot = new int[data.Ng][data.Nt];
            double prevFitness = getFitness(D, instructor_total_course, state);

            while (!done) {
                int action = explore_exploit(instructor_total_course, instructor_timeslot, state);
                if (action == -1) {
                    break;
                }

                D[state] = action;
                instructor_total_course[action] += 1;
                int timeslot_id = data.courses[state].getSlotId();
                instructor_timeslot[action][timeslot_id] = 1;
                int nextState = state + 1;
                if (nextState == data.Nc) {
                    done = true;
                }

                double curFitness = getFitness(D, instructor_total_course, nextState);
                double reward = curFitness - prevFitness;
                prevFitness = curFitness;


                if (done) {
                    Q[state][action] += alpha * (reward - Q[state][action]);
                    result.add(D);
                    
                    if (curFitness > bestFitness) {
                        System.out.println("Episode: " + episode + " - Fitness: " + curFitness);
                        bestFitness = curFitness;
                        System.arraycopy(D, 0, bestD, 0, data.Nc);

                    }
                } else {
                    Q[state][action] += alpha * (reward + gamma * findMaxQ(nextState) - Q[state][action]);
                    state = nextState;
                }
            }
            reduceEpsilon(episode);
        }
        return result;
    }

    private double findMaxQ(int state) {
        double max = Q[state][0];
        for (int i = 1; i < data.Ng; i++) {
            if (Q[state][i] > max) {
                max = Q[state][i];
            }
        }
        return max;
    }
}
