package wo.work_optimization.core.service.factory.sortingalgorithm.schedule;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
