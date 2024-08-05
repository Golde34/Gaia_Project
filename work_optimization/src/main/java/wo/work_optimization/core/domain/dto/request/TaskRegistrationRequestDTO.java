package wo.work_optimization.core.domain.dto.request;

import org.springframework.lang.NonNull;

import lombok.Data;

@Data
public class TaskRegistrationRequestDTO {
    @NonNull
    private Long userId;
    private double sleepDuration;
    private String startSleepTime;
    private String endSleepTime;
    private double relaxTime;
    private double travelTime;
    private double eatTime;
    @NonNull
    private double workTime;
}
