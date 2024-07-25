package kafka.lib.java.configuration.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import java.util.Map;

@ConfigurationProperties("app.kafka.producer")
@ConfigurationPropertiesScan
@Getter
@Setter
public class KafkaProducerServerConfig {
    private Map<String, ProducerServer> servers;

    @Getter
    @Setter
    public static class ProducerServer {
        private String bootstrapServers;
        private int retries;
        private int deliveryTimeout;
        private int requestTimeout;
    }
}
