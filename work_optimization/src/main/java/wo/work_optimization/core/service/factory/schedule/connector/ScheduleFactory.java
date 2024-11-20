package wo.work_optimization.core.service.factory.schedule.connector;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
