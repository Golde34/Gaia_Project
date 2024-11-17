package wo.work_optimization.ui.restful.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.usecase.rest.TaskOptimizationUseCase;
import wo.work_optimization.ui.restful.router.TaskOptimizationRouter;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TaskOptimizationController implements TaskOptimizationRouter {

     private final TaskOptimizationUseCase taskOptimizationUseCase;

     @Override
     public ResponseEntity<GeneralResponse<String>> optimizeTaskByUser(String userId) {
         return taskOptimizationUseCase.optimizeTaskByUser(userId);
     }
}
