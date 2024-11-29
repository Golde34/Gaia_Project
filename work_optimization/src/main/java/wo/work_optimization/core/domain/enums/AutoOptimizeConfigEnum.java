package wo.work_optimization.core.domain.enums;

import java.util.Arrays;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AutoOptimizeConfigEnum {
    OPTIMIZE_WHEN_CREATING_TASK(1, "task_creating"),
    OPTIMIZE_IN_FIXED_TIME(2, "fixed_time"),
    DISABLE_AUTO_OPTIMIZE(3, "disable");

    private final int value;
    private final String mode;

    public static AutoOptimizeConfigEnum of(int value) {
        return Arrays.stream(AutoOptimizeConfigEnum.values())
            .filter(autoOptimizeConfigEnum -> autoOptimizeConfigEnum.getValue() == value)
            .findFirst().get();
    }
}
