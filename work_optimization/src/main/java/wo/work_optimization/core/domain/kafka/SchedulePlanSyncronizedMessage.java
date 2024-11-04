package wo.work_optimization.core.domain.kafka;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchedulePlanSyncronizedMessage {
    private String taskSynchronizeStatus;
    private String scheduleTaskId;
    private String taskId;
    private String workOptimTaskId;
    
    public KafkaBaseDto<SchedulePlanSyncronizedMessage> toKafkaBaseSto(String errorCode, String errorMessage) {
        return KafkaBaseDto.<SchedulePlanSyncronizedMessage>builder()
                .cmd(TopicConstants.CreateScheduleTaskCommand.SYNC_SCHEDULE_TASK)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .data(this)
                .build();
    }
}
