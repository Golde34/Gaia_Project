package wo.work_optimization.core.service.factory.schedule.gaia_algorithm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.request.GaiaAlgorithmDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.service.factory.schedule.connector.ScheduleService;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GaiaAlgorithm extends ScheduleService<GaiaAlgorithmDTO, List<Task>> {

    private final CustomCalculatedHandler algorithm;

    @Override
    public String method() {
        return "GaiaAlgorithm";
    }

    @Override
    public List<Task> doSchedule(GaiaAlgorithmDTO request) {
        return algorithm.optimize(request);
    }

    @Override
    public GaiaAlgorithmDTO createRequest(List<Task> tasks, TaskRegistration taskRegistration, int batchIndex) {
        return GaiaAlgorithmDTO.builder()
                .userId(taskRegistration.getUserId())
                .tasks(tasks)
                .taskRegistration(taskRegistration)
                .batchIndex(batchIndex)
                .build();
    }

    @Override
    public List<List<Task>> sortTaskToBatches(List<Task> tasks) {
        tasks.sort((task1, task2) -> {
            LocalDate date1 = Instant.ofEpochMilli(task1.getEndDate())
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            LocalDate date2 = Instant.ofEpochMilli(task2.getEndDate())
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

            int dateCompare = date2.compareTo(date1);
            if (dateCompare != 0) {
                return dateCompare;
            } else {
                return Integer.compare(task2.getPriority(), task1.getPriority());
            }
        });

        List<List<Task>> taskBatches = new ArrayList<>();
        int batchSize = Constants.OptimizeVariables.BATCH_SIZE;
        for (int i = 0; i < tasks.size(); i += batchSize) {
            int end = Math.min(i + batchSize, tasks.size());
            List<Task> batch = tasks.subList(i, end);
            taskBatches.add(new ArrayList<>(batch));
        }

        return taskBatches;
    }

    @Override
    public String mapResponse(List<Task> response) {
       if (response.isEmpty()) {
           return Constants.ErrorStatus.FAIL;
       }
       return Constants.ErrorStatus.SUCCESS;
    }

}
