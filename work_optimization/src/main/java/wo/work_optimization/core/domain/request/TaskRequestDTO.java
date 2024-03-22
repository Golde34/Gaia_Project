package wo.work_optimization.core.domain.request;

import lombok.Data;

@Data
public class TaskRequestDTO {
    private String method;
    private String originalTaskId;
}
