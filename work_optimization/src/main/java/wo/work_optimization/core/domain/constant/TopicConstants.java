package wo.work_optimization.core.domain.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TopicConstants {
    @UtilityClass
    public class OptimizeTaskCommand {
        public static final String TOPIC = "OPTIMIZE_TASK";

        public static final String CREATE_TASK = "CREATE_TASK";
        public static final String SCHEDULE_TASK = "SCHEDULE_TASK";
    }

    @UtilityClass
    public class ScheduleJobCommand {
        public static final String TOPIC = "SCHEDULE_JOB";

        public static final String SCHEDULE_BY_TIME = "SCHEDULE_BY_TIME";
    }
}
