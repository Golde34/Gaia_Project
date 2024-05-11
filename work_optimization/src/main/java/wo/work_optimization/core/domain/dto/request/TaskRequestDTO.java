package wo.work_optimization.core.domain.dto.request;

import lombok.Data;

@Data
public class TaskRequestDTO {
    private String method;
    private String originalTaskId;
    private double effort;
    private double enjoyability;
    private double duration;
}
