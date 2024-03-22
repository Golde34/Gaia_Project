package wo.work_optimization.infrastructure.algorithm;

import java.util.ArrayList;
import java.util.List;

import wo.work_optimization.core.domain.entity.Task;

public class TabuSearch {
    private static final int DAILY_WORK_TIME = 10;
    private static final int BREAK_TIME = 2;
    private static final int TABU_SIZE = 10;
    private static final double PENALTY_FACTOR = 1.0;

    public static List<Task> scheduleTasks(List<Task> tasks) {
        List<Task> schedule = new ArrayList<>();
        List<Integer> tabuList = new ArrayList<>();

        tasks.forEach(task -> {
            int bestPosition = -1;
            double bestCost = Double.POSITIVE_INFINITY;
            for (int i = 0; i < schedule.size(); i++) {
                double cost = calculateCost(schedule, task, i);
                if (cost < bestCost) {
                    bestPosition = i;
                    bestCost = cost;
                }
            }
            if (!tabuList.contains(bestPosition)) {
                schedule.add(bestPosition, task);
                tabuList.add(bestPosition);
                if (tabuList.size() > TABU_SIZE) {
                    tabuList.remove(0);
                }
            }
        });
        return schedule;
    }

    private static double calculateCost(List<Task> schedule, Task task, int position) {

        if (position < 0 || position > schedule.size()) {
            return Double.POSITIVE_INFINITY;
        }

        double waitingTime = 0;
        if (position > 0) {
            waitingTime = schedule.get(position - 1).getEndDate() - task.getStartDate();
        }

        double workingTime = task.getDuration() + 2 * BREAK_TIME;

        double endTime = task.getStartDate() + waitingTime + workingTime;

        if (endTime > DAILY_WORK_TIME) {
            return Double.POSITIVE_INFINITY;
        }

        double cost = waitingTime + (DAILY_WORK_TIME - endTime) * PENALTY_FACTOR;

        return cost;
    }
}
