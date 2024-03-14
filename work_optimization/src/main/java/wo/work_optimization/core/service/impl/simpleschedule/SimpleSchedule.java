package wo.work_optimization.core.service.impl.simpleschedule;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.service.schedule.ScheduleConnector;
import wo.work_optimization.core.service.schedule.ScheduleFactory;

@Service
public class SimpleSchedule extends ScheduleConnector implements ScheduleFactory {

    @Override
    public String optimize() {
        return "Simple Schedule";
    }

    @Override
    public ScheduleConnector getMethodSchedule(String method) {
        return null;
    }
}
