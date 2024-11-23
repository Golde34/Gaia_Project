package wo.work_optimization.core.service.factory.schedule.tabu;

import java.util.List;

import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleService;

@Service
public class TabuSchedule extends ScheduleService<TaskRequestDTO, TaskResponseDTO> {
    @Override
    public String method() {
        return "tabu";
    }

    @Override
    public TaskResponseDTO doSchedule(TaskRequestDTO request) {
        return null;
    }

    @Override
    public TaskRequestDTO createRequest(List<Task> tasks, TaskRegistration taskRegistration) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createRequest'");
    }

    @Override
    public List<Task> mapResponse(TaskResponseDTO response) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'mapResponse'");
    }
}
