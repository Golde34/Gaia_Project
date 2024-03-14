package wo.work_optimization.core.service.schedule;

public abstract class ScheduleConnector {

    public <T> T doSchedule() {
        System.out.println(optimize());
        return null;
    }

    public abstract String optimize();
}
