package wo.work_optimization.core.domain.enums;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum TaskSortingAlgorithmEnum {
    PRIORITY(1, "Priority"),
    TIME(2, "Time"),
    PRIORITY_AND_TIME(3, "gaia"),
    TABU_SEARCH(4, "tabu");

    private final int option;
    private final String method;

    TaskSortingAlgorithmEnum(int option, String method) {
        this.option = option;
        this.method = method;
    }

    public static TaskSortingAlgorithmEnum of(int option) {
        return Arrays.stream(TaskSortingAlgorithmEnum.values())
            .filter(taskSortingAlgorithmEnum -> taskSortingAlgorithmEnum.getOption() == option)
            .findFirst().get();
    }
}
