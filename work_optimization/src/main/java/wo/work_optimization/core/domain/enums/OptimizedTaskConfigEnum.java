package wo.work_optimization.core.domain.enums;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum OptimizedTaskConfigEnum {
    OPTIMIZE_ALL_TASKS(1, "all"),
    REGISTERED_TASKS_IN_DAY(2, "in_day"),
    OPTIMIZE_TASKS_BY_TYPE(3, "by_type"),
    DISABLE_TASK_OPTIMIZATION(4, "disable");

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
