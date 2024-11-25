package wo.work_optimization.ui.restful.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRestRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.dto.response.base.ResponseFactory;
import wo.work_optimization.core.usecase.rest.TaskOptimizationUseCase;
import wo.work_optimization.ui.restful.router.TaskOptimizationRouter;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TaskOptimizationController implements TaskOptimizationRouter {

    private final TaskOptimizationUseCase taskOptimizationUseCase;

    public final ResponseFactory responseFactory;
    
    @Override
    public ResponseEntity<GeneralResponse<?>> optimizeTaskByUser(OptimizeTaskRestRequestDTO request) {
        GeneralResponse<?> response = taskOptimizationUseCase.optimizeTaskByUser(request);
        return responseFactory.success(response);
    }
}
