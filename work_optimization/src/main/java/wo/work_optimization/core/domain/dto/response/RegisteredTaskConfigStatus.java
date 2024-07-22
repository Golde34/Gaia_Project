package wo.work_optimization.core.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisteredTaskConfigStatus {
    @JsonProperty("isTaskConfigExist")
    private boolean isTaskConfigExist;
}
