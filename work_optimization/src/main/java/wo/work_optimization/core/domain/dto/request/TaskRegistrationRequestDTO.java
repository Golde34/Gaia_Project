package wo.work_optimization.core.domain.dto.request;

import org.springframework.lang.NonNull;

import lombok.Data;
import wo.work_optimization.core.domain.dto.sub_dto.SleepTimeDTO;

@Data
public class TaskRegistrationRequestDTO {
    @NonNull
    private Long userId;
    private SleepTimeDTO sleepTime;
    private double relaxTime;
    private double travelTime;
    private double eatTime;
    @NonNull
    private double workTime;
}
