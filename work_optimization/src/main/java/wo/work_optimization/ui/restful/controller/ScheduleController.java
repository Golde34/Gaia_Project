package wo.work_optimization.ui.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;

import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.usecase.rest.schedule.ScheduleConnector;
import wo.work_optimization.core.usecase.rest.schedule.ScheduleFactory;
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
