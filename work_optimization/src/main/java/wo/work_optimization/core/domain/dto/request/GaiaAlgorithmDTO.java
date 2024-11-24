package wo.work_optimization.core.domain.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.entity.TaskRegistration;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GaiaAlgorithmDTO {
    private long userId;
    private List<Task> tasks;
    private TaskRegistration taskRegistration;
    private int batchIndex;
}
