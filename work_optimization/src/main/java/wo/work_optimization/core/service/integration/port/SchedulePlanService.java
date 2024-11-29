package wo.work_optimization.core.service.integration.port;

import java.util.Map;

import org.springframework.stereotype.Service;

import kafka.lib.java.adapter.producer.KafkaPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.kafka.SchedulePlanSyncronizedMessage;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulePlanService {

    private final KafkaPublisher kafkaPublisher;

    public void sendKafkaToSyncWithSchedulePlan(Task task, String errorCode, String errorMessage) {
        log.info("Task before send kafka to sync with schedule plan: {}", task);
        SchedulePlanSyncronizedMessage data;
        if (DataUtils.isNullOrEmpty(task)) {
            data = SchedulePlanSyncronizedMessage.builder().taskSynchronizeStatus(Constants.ErrorStatus.FAIL).build();
        } else {
            data = SchedulePlanSyncronizedMessage.builder()
                    .taskSynchronizeStatus(Constants.ErrorStatus.SUCCESS)
                    .scheduleTaskId(task.getScheduleTaskId())
                    .taskId(task.getOriginalId())
                    .workOptimTaskId(task.getId())
                    .build();
        }
        KafkaBaseDto<SchedulePlanSyncronizedMessage> message = data.toKafkaBaseDto(errorCode, errorMessage);
        kafkaPublisher.pushAsync(message, TopicConstants.CreateScheduleTaskCommand.SYNC_TOPIC,
                Constants.WOConfiguration.KAFKA_CONTAINER_NAME, null);
        log.info("Sent kafka to sync with schedule plan");
    }

    public void pushOptimizeResult(long userId, Map<Integer, String> result) {
        log.info("Push optimize result to kafka: {}", result);
        // KafkaBaseDto<Map<Integer, String>> message = new KafkaBaseDto<>(result);
        // kafkaPublisher.pushAsync(message, TopicConstants.CreateScheduleTaskCommand.OPTIMIZE_RESULT_TOPIC,
        //         Constants.WOConfiguration.KAFKA_CONTAINER_NAME, null);
        // log.info("Sent optimize result to kafka");

    }
}
