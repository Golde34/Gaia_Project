package wo.work_optimization.infrastructure.algorithm.custom;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Getter
@Setter
public class CalculateTaskEffortNEnjoyability {

    private static final double maxWorkTime = 13;

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class TaskModel {
        private double duration;
        private double taskPriority;
        private int preferenceLevel;

        private double maxTime;
        private double tagPriority;

        public TaskModel(double duration, double taskPriority, int preferenceLevel, double maxTime, double tagPriority) {
            this.duration = duration;
            this.taskPriority = taskPriority;
            this.preferenceLevel = preferenceLevel;
            this.maxTime = maxTime;
            this.tagPriority = tagPriority;
        }
    }

    public static double calculateTagWeight(TaskModel taskModel) {
        return (taskModel.getMaxTime() / maxWorkTime) * taskModel.getTagPriority() * 10;
    }

    public static double calculateEffort(TaskModel taskModel, double weight) {
        double devide = taskModel.getDuration() / maxWorkTime;
        return devide * weight * 2 * 2.5;
    }

    public static double calculateEnjoyability(TaskModel taskModel, double weight) {
        return taskModel.getTaskPriority() * weight * (taskModel.getDuration() / taskModel.getMaxTime()) * taskModel.getPreferenceLevel() * 0.1 * 2;
    }

    public static void main(String[] args) {
        List<TaskModel> taskList = getTaskModels();
        double[] effort = new double[taskList.size()];
        double[] enjoyability = new double[taskList.size()];
        for (int i = 0; i < taskList.size(); i++) {
            double weight = calculateTagWeight(taskList.get(i));
            System.out.println("Weight: " + weight);
            effort[i] = calculateEffort(taskList.get(i), weight);
            enjoyability[i] = calculateEnjoyability(taskList.get(i), weight);
        }
        System.out.println("double[] effort= " + toString(effort) + ";");
        System.out.println("double[] enjoyability= " + toString(enjoyability) + ";");
    }

    private static List<TaskModel> getTaskModels() {
        TaskModel task11 = new TaskModel(4, 1, 7, 8, 0.9);
        TaskModel task12 = new TaskModel(3, 0.8, 5, 8, 0.9);
        TaskModel task13 = new TaskModel(1, 0.5, 7, 8, 0.9);
        TaskModel task21 = new TaskModel(2.5, 0.9, 10, 4.5, 1);
        TaskModel task22 = new TaskModel(2, 1, 8, 4.5, 1);
        TaskModel task31 = new TaskModel(0.5, 1, 9, 0.5, 1);

        List<TaskModel> taskList = new ArrayList<>();
        taskList.add(task11);
        taskList.add(task12);
        taskList.add(task13);
        taskList.add(task21);
        taskList.add(task22);
        taskList.add(task31);
        return taskList;
    }

    public static String toString(double[] a) {
        if (a == null)
            return "null";
        int iMax = a.length - 1;
        if (iMax == -1)
            return "{}";

        StringBuilder b = new StringBuilder();
        b.append('{');
        for (int i = 0; ; i++) {
            b.append(a[i]);
            if (i == iMax)
                return b.append('}').toString();
            b.append(", ");
        }
    }
}
