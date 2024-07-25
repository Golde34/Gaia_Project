package kafka.lib.java.configuration;

import kafka.lib.java.properties.KafkaConfigurationConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
@EnableKafka
@ConditionalOnProperty(
        value = {"spring.kafka.consumer.enabled"},
        havingValue = "true"
)

public class KafkaConsumerConfig {
    final KafkaConfigurationConsumer kafkaConfigurationConsumer;
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    public KafkaConsumerConfig(KafkaConfigurationConsumer kafkaConfigurationConsumer) {
        this.kafkaConfigurationConsumer = kafkaConfigurationConsumer;
    }

    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put("bootstrap.servers", this.bootstrapAddress);
        if (Objects.nonNull(this.kafkaConfigurationConsumer.getGroupId())) {
            props.put("group.id", this.kafkaConfigurationConsumer.getGroupId());
        } else {
            props.put("group.id", "default");
        }

        props.put("key.deserializer", StringDeserializer.class);
        props.put("value.deserializer", StringDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(props);
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory(@Qualifier("defaultKafkaTemplate") KafkaTemplate<String, String> kafkaTemplate) {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(this.consumerFactory());
        factory.setReplyTemplate(kafkaTemplate);
        return factory;
    }
}
