package wo.work_optimization.core.service.factory.schedule.connector;

import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.service.integration.TaskRegistrationService;
import wo.work_optimization.kernel.utils.JsonUtils;

@Slf4j
@Service
public abstract class ScheduleService<R, P> implements ScheduleConnector {

    @Autowired
    private TaskRegistrationService taskRegistrationService;

    @Override
    public List<Task> schedule(List<Task> tasks, Long userId) {
        try {
            TaskRegistration taskRegistration = taskRegistrationService.getTaskRegistrationByUserId(userId);
            R request = createRequest(tasks, taskRegistration);
            P resp = doSchedule(request);
            return mapResponse(resp);
        } catch (BusinessException e) {
            log.error("Error while scheduling", e);
            return Collections.emptyList(); 
        } catch (Exception e) {
            log.error("Error while scheduling, system error:", e);
            return Collections.emptyList();
        }
    }

    public abstract P doSchedule(R request);
    public abstract R createRequest(List<Task> tasks, TaskRegistration taskRegistration);
    public abstract List<Task> mapResponse(P response);

    public String requestToString(R request) {
        return JsonUtils.toJson(request);
    }

    public String responseToString(P response) {
        return JsonUtils.toJson(response);
    }
}

