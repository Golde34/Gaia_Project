package vn.com.viettel.vds.configuration.models;

import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import lombok.Getter;
import lombok.Setter;

@ConfigurationPropertiesScan
@ConfigurationProperties("app.kafka.consumer")
@Getter
@Setter
public class KafkaConsumerServerConfig {
    private Map<String, KafkaServerProperties> servers;
    
    @Getter
    @Setter
    public static class KafkaServerProperties {
        private String bootstrapServers;
        private String groupId;
        private List<String> topics;
    }
}
