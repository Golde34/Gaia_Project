package wo.work_optimization.ui.restful.router;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;

@RequestMapping("/schedule")
public interface ScheduleRouter {

    @GetMapping("/get-method-schedule")
    ResponseEntity<String> getMethodSchedule(@RequestBody TaskRequestDTO method);
}
