package wo.work_optimization.core.domain.dto.request;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequestDTO {
    private String sentence;
    private String project;
    private String groupTask;
    private TaskObjRequestDTO task;
}