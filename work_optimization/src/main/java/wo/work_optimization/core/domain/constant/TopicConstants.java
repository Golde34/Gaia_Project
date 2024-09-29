package wo.work_optimization.core.domain.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TopicConstants {
    @UtilityClass
    public class OptimizeTaskCommand {
        public static final String TOPIC = "task-manager.optimize-task.topic";
    }

    @UtilityClass
    public class ScheduleJobCommand {
        public static final String TOPIC = "SCHEDULE_JOB";

        public static final String SCHEDULE_BY_TIME = "SCHEDULE_BY_TIME";
    }

    @UtilityClass
    public class CreateTaskCommand {
        public static final String TOPIC = "task-manager.create-task.topic";

        public static final String CREATE_TASK = "taskManagerCreateTask";
    }

    @UtilityClass
    public class CreateScheduleTaskCommand {
        public static final String TOPIC = "schedule-plan.create-schedule-task.topic";

        public static final String CREATE_SCHEDULE_TASK = "schedulePlanCreateTask";
    }
}
