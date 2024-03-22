package wo.work_optimization.ui.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import wo.work_optimization.core.domain.request.TaskRequestDTO;
import wo.work_optimization.core.domain.response.TaskResponseDTO;
import wo.work_optimization.core.domain.response.base.GeneralResponse;
import wo.work_optimization.core.service.schedule.ScheduleConnector;
import wo.work_optimization.core.service.schedule.ScheduleFactory;
import wo.work_optimization.ui.restful.router.ScheduleRouter;

@RestController
public class ScheduleController implements ScheduleRouter {
    
     @Autowired
     private ScheduleFactory scheduleFactory;

    @Override
    public ResponseEntity<GeneralResponse<TaskResponseDTO>> getMethodSchedule(TaskRequestDTO method) {
         ScheduleConnector scheduleConnector = scheduleFactory.get(method.getMethod());
         return scheduleConnector.schedule(method);
    }
}
