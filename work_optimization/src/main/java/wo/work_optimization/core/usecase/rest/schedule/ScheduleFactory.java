package wo.work_optimization.core.usecase.rest.schedule;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
