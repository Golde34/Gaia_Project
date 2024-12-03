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
@NoArgsConstructor
@AllArgsConstructor
public class OptimizeTaskNotiMessage {
    private long userId;
    private String optimizeStatus;
    private String errorStatus;
    private String notificationFLowId;

    public KafkaBaseDto<OptimizeTaskNotiMessage> toKafkaBaseDto(String errorCode, String errorMessage) {
        return KafkaBaseDto.<OptimizeTaskNotiMessage>builder()
                .cmd(TopicConstants.NotificationCommand.OPTIMIZE_TASK)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .data(this)
                .build();
    }
}
