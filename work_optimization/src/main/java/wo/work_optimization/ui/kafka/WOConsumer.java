package wo.work_optimization.ui.kafka;

import kafka.lib.java.adapter.consumer.messagehandlers.KafkaMessageHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WOConsumer extends KafkaMessageHandler {
    @Override
    public String getTopic() {
        return "test";
    }

    @Override
    public void processMessage(String message, String topic) {
        log.info("Received message: {} from topic: {}", message, topic);
    }
}
