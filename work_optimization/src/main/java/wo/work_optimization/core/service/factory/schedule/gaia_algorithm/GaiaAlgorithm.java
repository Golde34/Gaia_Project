package wo.work_optimization.core.service.factory.schedule.gaia_algorithm;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GaiaAlgorithm extends ScheduleService<TaskRequestDTO, List<Task>> {

    private final CustomCalculatedHandler algorithm;

    @Override
    public String method() {
        return "GaiaAlgorithm";
    }

    @Override
    public List<Task> doSchedule(TaskRequestDTO request) {
        return algorithm.optimize(request);
    }

    @Override
    public TaskRequestDTO createRequest(List<Task> tasks, TaskRegistration taskRegistration) {
        return TaskRequestDTO.builder()
                .userId(taskRegistration.getUserId())
                .tasks(tasks)
                .taskRegistration(taskRegistration)
                .build();
    }

    @Override
    public List<Task> mapResponse(List<Task> response) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'mapResponse'");
    }    
}
