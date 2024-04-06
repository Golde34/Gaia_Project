package kafka.lib.java.configuration.consumer;

import kafka.lib.java.adapter.consumer.KafkaMessageContainer;
import kafka.lib.java.configuration.models.KafkaConsumerServerConfig;
import kafka.lib.java.configuration.models.KafkaServerConfig;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.AcknowledgingMessageListener;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableConfigurationProperties(KafkaConsumerServerConfig.class)
@NoArgsConstructor
@Slf4j
public class KafkaContainerFactory {

    @Autowired
    private KafkaMessageContainer handlerMessage;

    public ConcurrentMessageListenerContainer<String, String> dynamicKafkaListenerContainer(KafkaServerConfig entity, List<String> topics) {
        ContainerProperties containerProps = createContainerProperties(entity, topics);

        ConcurrentMessageListenerContainer<String, String> container = createContainer(entity, containerProps);

        container.setBeanName(entity.getBootstrapServers());
        container.start();

        return container;
    }

    private ContainerProperties createContainerProperties(KafkaServerConfig entity, List<String> topics) {
        topics.forEach(topic -> log.info("Topic: " + topic));
        log.info("Entity: " + entity.getBootstrapServers());
        log.info("Entity: " + entity.getGroupId());
        String [] topicArray = topics.toArray(new String[0]);

        AcknowledgingMessageListener<String, String> messageListener = (records, acknowledgment) -> {
            String message = records.value();
            int partition = records.partition();
            long offset = records.offset();
            String topic = records.topic();
           
            log.info("Current Thread: " + Thread.currentThread().getName());

            handlerMessage.contextHandlerMessage(message, partition, offset, topic);

            acknowledgment.acknowledge();
        };

        ContainerProperties containerProps = setupContainerProperties(topicArray, entity);
        containerProps.setMessageListener(messageListener);

        return containerProps;
    }

    private ContainerProperties setupContainerProperties(String[] topicArray, KafkaServerConfig entity) {
        ContainerProperties containerProps = new ContainerProperties(topicArray);
        containerProps.setGroupId(entity.getGroupId());
        containerProps.setPollTimeout(entity.getPollTimeout());
        containerProps.setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);
        containerProps.setSyncCommits(entity.isSyncCommits());
        return containerProps;
    }

    private ConcurrentMessageListenerContainer<String, String> createContainer(KafkaServerConfig entity, ContainerProperties containerProps) {
        Map<String, Object> props = consumerProps(entity);
        DefaultKafkaConsumerFactory<String, String> cf = new DefaultKafkaConsumerFactory<>(props);
        ConcurrentMessageListenerContainer<String, String> container = new ConcurrentMessageListenerContainer<>(cf, containerProps);
        container.setConcurrency(5);
        return container;
    }

    private Map<String, Object> consumerProps(KafkaServerConfig entity) {
        Map<String, Object> propsMap = new HashMap<>();
        propsMap.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, entity.getBootstrapServers());
        propsMap.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, entity.isEnableAutoCommitConfig());
        propsMap.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, entity.getAutoCommitIntervalMsConfig());
        propsMap.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, entity.getSessionTimeoutMsConfig());
        propsMap.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        propsMap.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        propsMap.put(ConsumerConfig.GROUP_ID_CONFIG, entity.getGroupId());
        propsMap.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, entity.getAutoOffsetResetConfig());
        return propsMap;
    }
}
