package wo.work_optimization.core.service.integration;

import java.util.Map;

import org.springframework.stereotype.Service;

import kafka.lib.java.adapter.producer.KafkaPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.kafka.OptimizeTaskNotiMessage;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final KafkaPublisher kafkaPublisher;

    public String sendOptimizeNotification(long userId, Map<Integer, String> result) {
        try {
            log.info("Sending optimize notification to user: {}", userId);
            final String[] optimizeStatus = { "SUCCESS" };
            result.entrySet().stream().forEach(r -> {
                if (Constants.ErrorStatus.FAIL.equals(r.getValue())) {
                    optimizeStatus[0] = Constants.ErrorStatus.FAIL;
                    return;
                }
            });
            OptimizeTaskNotiMessage data = OptimizeTaskNotiMessage.builder()
                    .userId(userId)
                    .optimizeStatus(optimizeStatus[0])
                    .build();
            KafkaBaseDto<OptimizeTaskNotiMessage> message = data.toKafkaBaseDto("00", "SUCCESS");
            kafkaPublisher.pushAsync(message, TopicConstants.NotificationCommand.OPTIMIZE_NOTIFICATION, "wo", null);
        } catch (Exception e) {
            log.error("Error sending optimize notification to user: {}", userId);
            // Send notification by rest
            return "Error sending optimize notification to user: " + userId;
        }
        return "Notification sent";
    }
}
