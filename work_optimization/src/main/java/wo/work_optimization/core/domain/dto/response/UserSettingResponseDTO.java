package wo.work_optimization.core.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSettingResponseDTO {
    private Integer optimizedTaskConfig;
    private Integer privateProfileConfig;
    private Integer taskSortingAlgorithm;
}
