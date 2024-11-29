package wo.work_optimization.core.domain.kafka;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleOptimizeTaskMessage {
    private long userId;
    private Object results;

    public KafkaBaseDto<ScheduleOptimizeTaskMessage> toKafkaBaseDto() {
        return KafkaBaseDto.<ScheduleOptimizeTaskMessage>builder()
            .cmd(null)
            .errorCode(null)
            .errorMessage(null)
            .data(this)
            .build();
    }
}
