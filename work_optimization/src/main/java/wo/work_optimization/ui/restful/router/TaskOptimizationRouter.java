package wo.work_optimization.ui.restful.router;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

@RequestMapping("/${spring.application.url-name}")
public interface TaskOptimizationRouter {

    @GetMapping("/optimize-task-by-user")
    ResponseEntity<GeneralResponse<String>> optimizeTaskByUser(@RequestParam Long userId);
}
