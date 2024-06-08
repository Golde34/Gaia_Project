package wo.work_optimization.core.service.rest.schedule;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
