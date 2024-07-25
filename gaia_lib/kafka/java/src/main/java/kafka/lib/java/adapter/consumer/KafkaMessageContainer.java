package kafka.lib.java.adapter.consumer;

import jakarta.annotation.PostConstruct;
import kafka.lib.java.adapter.consumer.messagehandlers.KafkaMessageHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@Slf4j
public class KafkaMessageContainer {

    private Set<KafkaMessageHandler> kafkaMessageHandlers;
    private static Map<String, KafkaMessageHandler> messageHandlerMap = new ConcurrentHashMap<>();

    public KafkaMessageContainer(Set<KafkaMessageHandler> kafkaMessageHandlers) {
        this.kafkaMessageHandlers = kafkaMessageHandlers;
    }

    @PostConstruct
    public void init() {
        messageHandlerMap = kafkaMessageHandlers
                .stream()
                .collect(Collectors.toMap(KafkaMessageHandler::getTopic, kafkaMessageHandler -> kafkaMessageHandler));
    }

    public void contextHandlerMessage(String message, int partition, long offset, String topic) {
        log.info("Received message: " + message + " from partition: " + partition + " with offset: " + offset
                + " from topic: " + topic);
        messageHandlerMap.get(topic).processMessage(message, topic);
    }
}
