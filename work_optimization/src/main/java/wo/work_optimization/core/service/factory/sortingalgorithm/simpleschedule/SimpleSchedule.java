package wo.work_optimization.core.service.factory.sortingalgorithm.simpleschedule;

import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.service.factory.sortingalgorithm.schedule.ScheduleService;

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
//        CustomModel customModel = new CustomModel(request.getEffort(), request.getEnjoyability(), request.getDuration());
//        double result = customModel.solveEquation();
//        return TaskResponseDTO.builder().schedule(String.valueOf(result)).build();
        return TaskResponseDTO.builder().schedule("OK").build();
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
