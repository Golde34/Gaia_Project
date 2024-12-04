package wo.work_optimization.core.domain.kafka;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterSchedulePlanMessage {
    private long userId;
    
    public KafkaBaseDto<RegisterSchedulePlanMessage> toKafkaBaseDto(String errorCode, String errorMessage) {
        return KafkaBaseDto.<RegisterSchedulePlanMessage>builder()
                .cmd(TopicConstants.SchedulePlanCommand.REGISTER_SCHEDULE_PLAN)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .data(this)
                .build();
    }
}
