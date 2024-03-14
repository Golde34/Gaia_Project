package wo.work_optimization.ui.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.service.schedule.ScheduleConnector;
import wo.work_optimization.core.service.schedule.ScheduleFactory;
import wo.work_optimization.ui.restful.router.ScheduleRouter;

@RestController
public class ScheduleController implements ScheduleRouter {
    
     @Autowired
     private ScheduleFactory scheduleFactory;

    @Override
    public ResponseEntity<String> getMethodSchedule(TaskRequestDTO method) {
         ScheduleConnector scheduleConnector = scheduleFactory.getMethodSchedule(method.getMethod());
         return ResponseEntity.ok(scheduleConnector.doSchedule());
    }
}
