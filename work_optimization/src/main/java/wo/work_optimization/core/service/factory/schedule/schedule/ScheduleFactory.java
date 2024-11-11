package wo.work_optimization.core.service.factory.schedule.schedule;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
