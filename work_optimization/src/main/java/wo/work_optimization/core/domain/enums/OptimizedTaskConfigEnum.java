package wo.work_optimization.core.domain.enums;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum OptimizedTaskConfigEnum {
    FIRST_IN_LAST_OUT(1, "stack"),
    OPTIMIZE_ALL_TASKS(2, "all"),
    CALCULATE_TIME_AND_OPTIMIZE(3, "in_day"),
    REGISTER_TASKS_BY_DAY(4, "insert");

    private final int option;
    private final String mode;

    OptimizedTaskConfigEnum(int option, String mode) {
        this.option = option;
        this.mode = mode;
    }

    public static OptimizedTaskConfigEnum of(int option) {
        return Arrays.stream(OptimizedTaskConfigEnum.values())
            .filter(optimizedTaskConfigEnum -> optimizedTaskConfigEnum.getOption() == option)
            .findFirst().get();
    }
}
