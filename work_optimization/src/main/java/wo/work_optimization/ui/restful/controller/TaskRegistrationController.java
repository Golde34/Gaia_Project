package wo.work_optimization.ui.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import wo.work_optimization.core.domain.dto.request.QueryTaskConfigRequestDTO;
import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.dto.response.base.ResponseFactory;
import wo.work_optimization.core.service.integration.TaskRegistrationService;
import wo.work_optimization.ui.restful.router.TaskRegistrationRouter;

@RestController
public class TaskRegistrationController implements TaskRegistrationRouter {

    @Autowired
    public TaskRegistrationService taskRegistrationService;

    @Autowired
    public ResponseFactory responseFactory;

    @Override
    public ResponseEntity<GeneralResponse<?>> registerTaskConfig(TaskRegistrationRequestDTO request) {
        GeneralResponse<?> response = taskRegistrationService.registerWorkOptimization(request);
        return responseFactory.success(response);
    }

    @Override
    public ResponseEntity<GeneralResponse<?>> getTaskConfigInfo(QueryTaskConfigRequestDTO request) {
        GeneralResponse<?> response = taskRegistrationService.userRegisterTaskInformation(request);
        return responseFactory.success(response);
    }
}