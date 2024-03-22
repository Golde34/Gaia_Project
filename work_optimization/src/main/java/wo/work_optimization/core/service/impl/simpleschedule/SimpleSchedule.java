package wo.work_optimization.core.service.impl.simpleschedule;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.request.TaskRequestDTO;
import wo.work_optimization.core.domain.response.TaskResponseDTO;
import wo.work_optimization.core.service.schedule.ScheduleService;

@Service
public class SimpleSchedule extends ScheduleService<TaskRequestDTO, TaskResponseDTO> {

    @Override
    public String method() {
        return "simple";
    }

    @Override
    public void validateRequest(TaskRequestDTO request) {
        if (request.getOriginalTaskId() == null) {
            throw new IllegalArgumentException("Original task id is required");
        }
    }

    @Override
    public TaskResponseDTO doSchedule(TaskRequestDTO request) {
        return null;
    }

    @Override
    public TaskRequestDTO createRequest(TaskRequestDTO request) {
        return request;
    }

    @Override
    public TaskResponseDTO mapResponse(TaskRequestDTO request, TaskResponseDTO response) {
        return TaskResponseDTO.builder()
                .schedule("TABU")
                .build();
    }
}
