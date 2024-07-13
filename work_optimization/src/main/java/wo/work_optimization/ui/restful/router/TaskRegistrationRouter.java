package wo.work_optimization.ui.restful.router;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

@RequestMapping("/task-registration")
public interface TaskRegistrationRouter {
    
    @PostMapping("/register-work-optimization")
    ResponseEntity<GeneralResponse<String>> registerWorkOptimization(@RequestBody TaskRegistrationRequestDTO request);
}
