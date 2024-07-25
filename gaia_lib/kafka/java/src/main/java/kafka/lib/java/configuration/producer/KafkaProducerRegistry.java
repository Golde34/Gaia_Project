package kafka.lib.java.configuration.producer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Configuration
public class KafkaProducerRegistry {
    private final Map<String, KafkaTemplate<String, String>> kafkaServerContainerStorage = new ConcurrentHashMap<>();

    public void addContainerToWrapperMap(String key, KafkaTemplate<String, String> kafkaTemplate) {
        kafkaServerContainerStorage.put(key, kafkaTemplate);
    }
    
    public Map<String, KafkaTemplate<String, String>> getKafkaServerContainerStorage() {
        return kafkaServerContainerStorage;
    }

    public KafkaTemplate<String, String> getKafkaTemplate(String serverName) {
        try {
            for (Map.Entry<String, KafkaTemplate<String, String>> entry : kafkaServerContainerStorage.entrySet()) {
                if (entry.getKey().equals(serverName)) {
                    return entry.getValue();
                }
            }
            throw new Exception("Container for bootstrap server " + serverName + "not found.");
        } catch (Exception e) {
            log.error("There are no Kafka Container matches in the kafka server configuration.");
            e.printStackTrace();
            return null;
        }
    }
}
