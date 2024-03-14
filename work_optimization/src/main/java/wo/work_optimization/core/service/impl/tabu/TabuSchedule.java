package wo.work_optimization.core.service.impl.tabu;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.service.schedule.ScheduleConnector;
import wo.work_optimization.core.service.schedule.ScheduleFactory;

@Service
public class TabuSchedule extends ScheduleConnector implements ScheduleFactory {
    public String optimize() {
        return "Tabu Schedule";
    }

    @Override
    public ScheduleConnector getMethodSchedule(String method) {
        return null;
    }
}
