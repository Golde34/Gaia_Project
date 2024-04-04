package vn.com.viettel.vds.configuration.producer;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import lombok.extern.slf4j.Slf4j;
import vn.com.viettel.vds.configuration.models.KafkaProducerServerConfig;
import vn.com.viettel.vds.properties.KafkaConfigurationProducer;

@Slf4j
@Configuration
@EnableConfigurationProperties({
    KafkaProducerServerConfig.class
})
public class LoadKafkaProducer {

    @Autowired
    private KafkaProducerServerConfig getListServers;

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private KafkaProducerRegistry kafkaProducerRegistry;

    private final KafkaConfigurationProducer kafkaConfigurationProducer;

    public LoadKafkaProducer(KafkaConfigurationProducer kafkaConfigurationProducer) {
        this.kafkaConfigurationProducer = kafkaConfigurationProducer;
    }

    @Bean
    public void loadKafkaProducerServerConfigs() {
        try {
        Map<String, KafkaProducerServerConfig.ProducerServer> servers = getListServers.getServers();
        servers.forEach((key, value) -> {
            log.info("Kafka Server name: " + key);
            KafkaTemplate<String, String> kafkaTemplate = kafkaTemplate(value);
            initKafkaTemplateBean(kafkaTemplate, key);
            // Store KafkaTemplate
            kafkaProducerRegistry.addContainerToWrapperMap(key, kafkaTemplate);
        });
    } catch (Exception e) {
        log.error("No config dynamic kafka, init default kafka template");
    }
    }

    private KafkaTemplate<String, String> kafkaTemplate(KafkaProducerServerConfig.ProducerServer configs) {
        return new KafkaTemplate<>(this.producerFactory(configs));
    }

    public ProducerFactory<String, String> producerFactory(KafkaProducerServerConfig.ProducerServer value) {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, value.getBootstrapServers()); 
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.RETRIES_CONFIG, 
        isConfigNotNull(value.getRetries()) ? value.getRetries() : this.kafkaConfigurationProducer.getRetries());
        props.put(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG,
        isConfigNotNull(value.getDeliveryTimeout()) ? value.getDeliveryTimeout() : this.kafkaConfigurationProducer.getDeliveryTimeout());
        props.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG,
        isConfigNotNull(value.getRequestTimeout()) ? value.getRequestTimeout() : this.kafkaConfigurationProducer.getRequestTimeout());
        return new DefaultKafkaProducerFactory<>(props, new StringSerializer(), new StringSerializer());
    }

    private boolean isConfigNotNull(Integer config) {
        if (config == null || config == 0) {
            return false;
        }
        return true;
    }

    private void initKafkaTemplateBean(KafkaTemplate<String, String> kafkaTemplate, String serverName) {
        ConfigurableApplicationContext context = (ConfigurableApplicationContext) applicationContext;
        DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) context.getBeanFactory();

        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.rootBeanDefinition(KafkaTemplate.class);

        beanDefinitionBuilder.addPropertyValue(serverName, kafkaTemplate);
        beanFactory.registerBeanDefinition(serverName,
                beanDefinitionBuilder.getBeanDefinition());
    }
}
