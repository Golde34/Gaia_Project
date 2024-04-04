package vn.com.viettel.vds.configuration.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.KafkaMessageListenerContainer;
import org.springframework.stereotype.Component;
import vn.com.viettel.vds.configuration.models.KafkaConsumerServerConfig;
import vn.com.viettel.vds.configuration.models.KafkaServerConfig;

import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@Configuration
@Slf4j
@EnableConfigurationProperties({
        KafkaConsumerServerConfig.class,
        KafkaServerConfig.class
})
public class KafkaServerContainersInitializer {

    private final KafkaContainerFactory dynamicKafkaListenerContainers;

    @Autowired
    private KafkaConsumerRegistry kafkaContainerRegistry;

    @Autowired
    private KafkaConsumerServerConfig getListServers;
    @Autowired
    private KafkaServerConfig kafkaServerConfig;

    public KafkaServerContainersInitializer(KafkaContainerFactory dynamicKafkaListenerContainers) {
        this.dynamicKafkaListenerContainers = dynamicKafkaListenerContainers;
    }

    @Bean
    public String loadKafkaConsumerServerConfigs() {
        try {
            Map<String, KafkaConsumerServerConfig.KafkaServerProperties> kafkaServers = getListServers.getServers();

            for (Map.Entry<String, KafkaConsumerServerConfig.KafkaServerProperties> entry : kafkaServers.entrySet()) {
                log.info("Kafka Server Name: " + entry.getKey());
                KafkaServerConfig entity = initKafkaServerEntity(entry.getValue());
                // Init ListenerContainer
                try {
                    ConcurrentMessageListenerContainer<String, String> container = dynamicKafkaListenerContainers
                            .dynamicKafkaListenerContainer(entity, entry.getValue().getTopics());
                    // Store containers into the Map
                    kafkaContainerRegistry.addContainerToWrapperMap(entity.getBootstrapServers(), container);
                } catch (Exception e) {
                    log.error("Cannot load Kafka Container" + e.getMessage(), e);
                }
            }
            return "Create dynamic containers successfully";
        } catch (Exception e) {
            String error = "No dynamic consumer config";
            log.error("No dynamic consumer config", e);
            return error;
        }
    }

    private KafkaServerConfig initKafkaServerEntity(KafkaConsumerServerConfig.KafkaServerProperties kafkaServer) {
        kafkaServerConfig.setBootstrapServers(kafkaServer.getBootstrapServers());
        kafkaServerConfig.setGroupId(kafkaServer.getGroupId());
        return kafkaServerConfig;
    }

    public boolean deactivateContainer(String identifier) {
        ConcurrentMessageListenerContainer<String, String> container = kafkaContainerRegistry.getKafkaContainer(identifier);
        if (container != null) {
            container.stop();
            return true;
        } else {
            return false;
        }
    }

    public boolean activateContainer(String identifier) {
        ConcurrentMessageListenerContainer<String, String> container = kafkaContainerRegistry.getKafkaContainer(identifier);
        if (container != null) {
            container.start();
            return true;
        } else {
            return false;
        }
    }
}
