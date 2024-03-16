package wo.work_optimization.core.service.schedule;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
