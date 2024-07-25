package kafka.lib.java.configuration.models;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import lombok.Getter;
import lombok.Setter;

@ConfigurationPropertiesScan
@ConfigurationProperties(prefix = "app.kafka")
@Setter
@Getter
public class KafkaServerConfig {
    private String bootstrapServers;
    private String groupId;
    private boolean enableAutoCommitConfig;
    private String autoCommitIntervalMsConfig;
    private String sessionTimeoutMsConfig;
    private String autoOffsetResetConfig;
    private Integer pollTimeout=3000;
    private boolean syncCommits=true;
}
