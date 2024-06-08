package kafka.lib.java.configuration.consumer;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class KafkaConsumerRegistry {
    private final Map<String, ConcurrentMessageListenerContainer<String, String>> kafkaConsumerContainers = new ConcurrentHashMap<>();

    public void addContainerToWrapperMap(String key, ConcurrentMessageListenerContainer<String, String> container) {
        kafkaConsumerContainers.put(key, container);
    }

    public Map<String, ConcurrentMessageListenerContainer<String, String>> getKafkaServerContainerStorage() {
        return kafkaConsumerContainers;
    }

    public ConcurrentMessageListenerContainer<String, String> getKafkaContainer(String bootstrapServer) {
        try {
            for (Map.Entry<String, ConcurrentMessageListenerContainer<String, String>> entry : kafkaConsumerContainers.entrySet()) {
                if (entry.getKey().equals(bootstrapServer)) {
                    return entry.getValue();
                }
            }
            throw new Exception("Container for bootstrap server " + bootstrapServer + "not found.");
        } catch (Exception e) {
            log.error("There are no Kafka Container matches in the kafka server configuration.");
            return null;
        }
    }
}
