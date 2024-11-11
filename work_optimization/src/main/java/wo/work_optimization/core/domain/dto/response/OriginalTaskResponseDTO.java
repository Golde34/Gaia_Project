package wo.work_optimization.core.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import wo.work_optimization.core.domain.dto.request.TaskObjRequestDTO;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OriginalTaskResponseDTO {
    @JsonProperty("task")
    private TaskObjRequestDTO task;
}
