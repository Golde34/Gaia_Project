package vn.com.viettel.vds.configuration.models;

import java.util.Map;

import javax.validation.constraints.NotBlank;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties("app.kafka.producer")
@ConfigurationPropertiesScan
@Getter
@Setter
public class KafkaProducerServerConfig {
    @NotBlank
    private Map<String, ProducerServer> servers;

    @Getter
    @Setter
    public static class ProducerServer {
        @NotBlank
        private String bootstrapServers;
        private int retries;
        private int deliveryTimeout;
        private int requestTimeout;
    }
}
