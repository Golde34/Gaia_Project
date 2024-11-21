package wo.work_optimization.core.domain.dto.request;

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
public class OptimizeTaskRestRequestDTO {
    private Long userId;
    private String optimizedDate; 
}
