package wo.work_optimization.core.domain.enums;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum TaskPriorityEnum {
    HIGH(3, "High"),
    MEDIUM(2, "Medium"),
    LOW(1, "Low"),
    STAR(5, "Star");

    private final int weight;
    private final String priority;

    TaskPriorityEnum(int weight, String priority) {
        this.weight = weight;
        this.priority = priority;
    }

    public static TaskPriorityEnum of(String priority) {
        // return TaskPriorityEnum
        return Arrays.stream(TaskPriorityEnum.values())
            .filter(taskPriorityEnum -> taskPriorityEnum.getPriority().equals(priority))
            .findFirst().get();
        
    }
}
