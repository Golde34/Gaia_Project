package wo.work_optimization.core.usecase.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.service.factory.schedule.schedule.ScheduleConnector;
import wo.work_optimization.core.service.factory.schedule.schedule.ScheduleFactory;
import wo.work_optimization.core.service.integration.TaskRegistrationService;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskOptimizationUseCase {
    
    private final ScheduleFactory scheduleFactory;
    private final TaskRegistrationService taskRegistrationService;

    public ResponseEntity<GeneralResponse<String>> optimizeTaskByUser(Long userId) {
        // Get Task Registration By User Id
        TaskRegistration taskRegistration = taskRegistrationService.getTaskRegistrationByUserId(userId);
        // Call auth service to get user settings
        // Optimize Task by Schedule Factory
        TaskRequestDTO taskRequestDTO = new TaskRequestDTO();
        taskRequestDTO.setMethod("GET");
        ScheduleConnector scheduleConnector = scheduleFactory.get(taskRequestDTO.getMethod());
        ResponseEntity<GeneralResponse<TaskResponseDTO>> result = scheduleConnector.schedule(taskRequestDTO);
        log.info("Optimize Task By User: {}", result.getBody().getData().toString());
        return ResponseEntity.ok(GeneralResponse.<String>builder()
            .status("SUCCESS")
            .statusMessage("Optimize Task By User")
            .data("Optimize Task By User")
            .build());
    }


}
