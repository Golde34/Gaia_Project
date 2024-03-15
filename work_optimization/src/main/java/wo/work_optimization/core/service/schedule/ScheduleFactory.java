package wo.work_optimization.core.service.schedule;

import org.springframework.stereotype.Service;

public interface ScheduleFactory {
    ScheduleConnector get(String method);
}
