package Code.RL;

import Code.utils.Data;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

/**
 *
 * @author tungd
 */
public class MainRL {

    public static void main(String[] args) throws IOException {
        Data data = Data.readDataFromFrile();

        int episodes = 30000;
        double alpha = 0.001;
        int gamma = 1;
        double epsilon = 1;
        double max_epsilon = 1;
        double min_epsilon = 0.01;
        double epsilon_decay_rate = 0.0002;

        Q_learning q_learning = new Q_learning(data, episodes, alpha, gamma, epsilon, max_epsilon, min_epsilon, epsilon_decay_rate);

        ArrayList<int[]> q_result = q_learning.implement();
        for (int i = 0; i < q_learning.bestD.length; i++) {
            System.out.print(q_learning.bestD[i] + " ");
        }

    }
}
