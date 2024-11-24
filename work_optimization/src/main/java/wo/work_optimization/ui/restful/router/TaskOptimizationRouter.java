package wo.work_optimization.ui.restful.router;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.entity.Task;

@RequestMapping("/${spring.application.url-name}")
public interface TaskOptimizationRouter {

    @PostMapping("/optimize-task-by-user")
    ResponseEntity<GeneralResponse<List<Task>>> optimizeTaskByUser(@RequestBody OptimizeTaskRestRequestDTO request);
}
