package wo.work_optimization.core.service.factory.schedule.gaia_algorithm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleService;

import java.util.ArrayList;
import java.util.Comparator;
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
    public List<List<Task>> sortTaskToBatches(List<Task> tasks) {
    tasks.sort(Comparator.comparingLong(Task::getEndDate));
    log.info("List task after sorting: {}", tasks);

    List<List<Task>> taskBatches = new ArrayList<>();
    List<Task> currentBatch = new ArrayList<>();
    long currentEndDate = -1; 

    for (Task task : tasks) {
        if ((currentEndDate != -1 && task.getEndDate() != currentEndDate) || currentBatch.size() >= 10) {
            if (currentBatch.size() > 10) {
                currentBatch.sort(Comparator.comparingInt(Task::getPriority).reversed());
                List<Task> tempBatch = new ArrayList<>();
                for (Task t : currentBatch) {
                    tempBatch.add(t);
                    if (tempBatch.size() == 10) {
                        taskBatches.add(new ArrayList<>(tempBatch));
                        tempBatch.clear();
                    }
                }
                if (!tempBatch.isEmpty()) {
                    taskBatches.add(new ArrayList<>(tempBatch));
                }
            } else {
                taskBatches.add(new ArrayList<>(currentBatch));
            }
            currentBatch.clear();
        }

        currentBatch.add(task);
        currentEndDate = task.getEndDate();
    }

    // Xử lý batch cuối cùng
    if (!currentBatch.isEmpty()) {
        if (currentBatch.size() > 10) {
            currentBatch.sort(Comparator.comparingInt(Task::getPriority).reversed());
            List<Task> tempBatch = new ArrayList<>();
            for (Task t : currentBatch) {
                tempBatch.add(t);
                if (tempBatch.size() == 10) {
                    taskBatches.add(new ArrayList<>(tempBatch));
                    tempBatch.clear();
                }
            }
            if (!tempBatch.isEmpty()) {
                taskBatches.add(new ArrayList<>(tempBatch));
            }
        } else {
            taskBatches.add(new ArrayList<>(currentBatch));
        }
    }

    return taskBatches;
}

    @Override
    public String mapResponse(List<Task> response) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'mapResponse'");
    }

}
