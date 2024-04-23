package wo.work_optimization.ui.kafka;

import kafka.lib.java.adapter.consumer.messagehandlers.KafkaMessageHandler;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WOConsumer extends KafkaMessageHandler {

    @Override
    public String getTopic() {
        log.info("ATopic: {}", "test");
        return TopicConstants.OptimizeTaskCommand.TOPIC;
    }

    @Override
    public void processMessage(String message, String topic) {
        log.info("Received message: {} from topic: {}", message, topic);
        // get cmd from message
        String cmd = ExtractKafkaMessage.getCommand(message);
        log.info("Command is: {}", cmd);
    }
}
