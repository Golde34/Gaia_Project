package wo.work_optimization.ui.restful.router;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

@RequestMapping("/${spring.application.url-name}/register-task-config")
public interface TaskRegistrationRouter {
    
    @PostMapping("")
    ResponseEntity<GeneralResponse<String>> registerWorkOptimization(@RequestBody TaskRegistrationRequestDTO request);
}
