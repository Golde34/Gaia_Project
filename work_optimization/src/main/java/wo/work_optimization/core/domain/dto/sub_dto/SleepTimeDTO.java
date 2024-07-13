package wo.work_optimization.core.domain.dto.sub_dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SleepTimeDTO {
    private double sleepDuration;
    private Date startSleepTime;
    private Date endSleepTime;
}
