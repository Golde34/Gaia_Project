package wo.work_optimization.core.domain.kafka;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchedulePlanTaskOrderMessage {
    private long userId;
    private List<Task> tasks; 

    public KafkaBaseDto<SchedulePlanTaskOrderMessage> toKafkaBaseDto(String errorCode, String errorMessage) {
        return KafkaBaseDto.<SchedulePlanTaskOrderMessage>builder()
                .cmd(TopicConstants.SchedulePlanCommand.OPTIMIZE_SCHEDULE_TASK)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .data(this)
                .build();
    }
}
