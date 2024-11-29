package wo.work_optimization.core.domain.enums;

public enum AutoOptimizeConfigEnum {
    OPTIMIZE_WHEN_CREATING_TASK(1),
    OPTIMIZE_IN_FIXED_TIME(2),
    DISABLE_AUTO_OPTIMIZE(3);

    private final Integer value;

    AutoOptimizeConfigEnum(Integer value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }

    public static AutoOptimizeConfigEnum fromValue(Integer value) {
        for (AutoOptimizeConfigEnum autoOptimizeConfigEnum : AutoOptimizeConfigEnum.values()) {
            if (autoOptimizeConfigEnum.getValue().equals(value)) {
                return autoOptimizeConfigEnum;
            }
        }
        return null;
    } 
}
