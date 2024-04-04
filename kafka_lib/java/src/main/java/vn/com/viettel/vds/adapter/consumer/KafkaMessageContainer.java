package vn.com.viettel.vds.adapter.consumer;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import vn.com.viettel.vds.adapter.consumer.messagehandlers.KafkaMessageHandler;

import javax.annotation.PostConstruct;
import java.util.List;
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
