package kafka.lib.java.configuration;

import kafka.lib.java.properties.KafkaConfigurationProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
@ConditionalOnProperty(
    value = {"spring.kafka.producer.enabled"},
    havingValue = "true"
)
@SuppressWarnings("all")
public class KafkaProducerEventConfig {
  final KafkaConfigurationProducer kafkaConfigurationProducer;

  public KafkaProducerEventConfig(KafkaConfigurationProducer kafkaConfigurationProducer) {
    this.kafkaConfigurationProducer = kafkaConfigurationProducer;
  }

  @Bean({"kafkaEventProducerFactory"})
  public ProducerFactory<String, String> producerFactory() {
    Map<String, Object> props = new HashMap<>();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, this.kafkaConfigurationProducer.getBootstrapServers());
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    props.put(ProducerConfig.RETRIES_CONFIG, this.kafkaConfigurationProducer.getRetries());
    props.put(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG, this.kafkaConfigurationProducer.getDeliveryTimeout());
    props.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG, this.kafkaConfigurationProducer.getRequestTimeout());
    return new DefaultKafkaProducerFactory<>(props, new StringSerializer(), new StringSerializer());
  }

  @Bean({"defaultKafkaTemplate"})
  @Primary
  public KafkaTemplate<String, String> kafkaTemplate() {
    return new KafkaTemplate<>(this.producerFactory());
  }

  public KafkaConfigurationProducer getKafkaConfigurationProducer() {
    return this.kafkaConfigurationProducer;
  }
}
