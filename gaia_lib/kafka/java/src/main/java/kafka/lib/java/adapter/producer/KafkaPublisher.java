package kafka.lib.java.adapter.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kafka.lib.java.configuration.producer.KafkaProducerRegistry;
import kafka.lib.java.constants.Constant;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.header.internals.RecordHeader;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("deprecation")
@Slf4j
@ConditionalOnProperty(value = { "spring.kafka.producer.enabled" }, havingValue = "true")
@Component
public class KafkaPublisher {
    public final KafkaProducerRegistry kafkaTemplate;

    public final ObjectMapper objectMapper;

    protected KafkaPublisher(KafkaProducerRegistry kafkaTemplate) {
        this.objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
        this.kafkaTemplate = kafkaTemplate;
    }

    /**
     * Send message to kafka with non-blocking in specific kafka server which
     * defined in application.properties.
     * Add the callback to handle success/failure after.
     * 
     * @param payload     Message Object to push
     * @param topic       Target topic
     * @param kafkaServer The specific kafka server defined in app.kafka.producer
     * @param callback    Callback function to handle success/failure after
     * @param <T>         Message Object type
     * @return void
     */
    public <T> void pushAsync(T payload, String topic, String kafkaServer, ListenableFutureCallback<String> callback) {
        sendMessageAsync(payload, topic, kafkaServer, callback);
    }

    /**
     * Send message to kafka with non-blocking in default kafka server.
     * Add the callback to handle success/failure after.
     * 
     * @param payload  Message Object to push
     * @param topic    Target topic
     * @param callback Callback function to handle success/failure after
     * @param <T>      Message Object type
     * @return void
     */
    public <T> void pushAsync(T payload, String topic, ListenableFutureCallback<String> callback) {
        sendMessageAsync(payload, topic, callback);
    }

    /**
     * Send message to kafka non-blocking with default callback.
     * 
     * @param payload     Message Object to push
     * @param topic       Target topic
     * @param kafkaServer The specific kafka server defined in app.kafka.producer
     * @param <T>         Message Object type
     * @return void
     */
    public <T> void pushAsync(T payload, String topic, String kafkaServer) {
        sendMessageAsync(payload, topic, kafkaServer, null);
    }

    /**
     * Send message to kafka non-blocking with default callback and default kafka
     * 
     * @param payload Message Object to push
     * @param topic   Target topic
     * @param <T>     Message Object type
     * @return void
     */
    public <T> void pushAsync(T payload, String topic) {
        sendMessageAsync(payload, topic, null);
    }

    private <T> void sendMessageAsync(T data, String topic, ListenableFutureCallback<String> callback) {
        sendMessageAsync(data, topic, Constant.DEFAULT_KAFKA_TEMPLATE, callback);
    }

    private <T> void sendMessageAsync(T data, String topic, String kafkaServer,
            ListenableFutureCallback<String> callback) {
        String message;
        try {
            message = this.objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException exception) {
            log.error("Exception when parse data to json {}", exception.getMessage());
            return;
        }
        @SuppressWarnings("unchecked")
        ListenableFuture<SendResult<String, String>> future = (ListenableFuture<SendResult<String, String>>) this.kafkaTemplate.getKafkaTemplate(kafkaServer).send(topic, message);
        if (callback != null) {
            future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
                public void onSuccess(@SuppressWarnings("null") SendResult<String, String> result) {
                    log.info("===> Sent message=[" + message + "] with offset=[" + result.getRecordMetadata().offset()
                            + "] to topic: " + topic + " SUCCESS !!!");
                    callback.onSuccess(message);
                }

                public void onFailure(@SuppressWarnings("null") Throwable ex) {
                    log.info("xxxx> Unable to send message=[" + message + "] to topic: " + topic
                            + " FAIL !!! \n Due to : "
                            + ex.getMessage(), ex);
                    callback.onFailure(ex);
                }
            });
        }
    }

    /**
     * Send message to kafka with blocking in specific kafka server which
     * defined in application.properties.
     * 
     * @param payload     Message Object to push
     * @param topic       Target topic
     * @param headers     Headers of Kafka message
     * @param kafkaServer The specific kafka server defined in app.kafka.producer
     * @param partition   The specific partition to send message
     * @param <T>         Message Object type
     * @return void
     */
    public <T> boolean pushSync(T payload, String topic, Map<String, byte[]> headers, String kafkaServer,
            Integer partition) {
        return sendMessageSync(payload, topic, headers, kafkaServer, partition);
    }

    /**
     * Send message to kafka with blocking in specific kafka server which
     * defined in application.properties.
     * 
     * @param payload     Message Object to push
     * @param topic       Target topic
     * @param kafkaServer The specific kafka server defined in app.kafka.producer
     * @param <T>         Message Object type
     * @return void
     */
    public <T> boolean pushSync(T payload, String topic, String kafkaServer) {
        return sendMessageSync(payload, topic, new HashMap<>(), kafkaServer, null);
    }

    /**
     * Send message to kafka with blocking in specific kafka server which
     * defined in application.properties.
     * 
     * @param payload   Message Object to push
     * @param topic     Target topic
     * @param headers   Headers of Kafka message
     * @param partition The specific partition to send message
     * @param <T>       Message Object type
     * @return void
     */
    public <T> boolean pushSync(T payload, String topic, Map<String, byte[]> headers, Integer partition) {
        return sendMessageSync(payload, topic, headers, partition);
    }

    /**
     * Send message to kafka with blocking in specific kafka server which
     * defined in application.properties.
     * 
     * @param payload Message Object to push
     * @param topic   Target topic
     * @param <T>     Message Object type
     * @return void
     */
    public <T> boolean pushSync(T payload, String topic) {
        return sendMessageSync(payload, topic, new HashMap<>(), null);
    }

    private <T> boolean sendMessageSync(T data, String topic, Map<String, byte[]> headers, Integer partition) {
        return sendMessageSync(data, topic, headers, Constant.DEFAULT_KAFKA_TEMPLATE, partition);
    }

    private <T> boolean sendMessageSync(T data, String topic, Map<String, byte[]> headers, String kafkaServer,
            Integer partition) {
        String message;
        try {
            message = this.objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException exception) {
            log.error("Exception when parse data to json {}", exception.getMessage());
            return false;
        }
        ProducerRecord<String, String> producerRecord;
        if (partition == null) {
            producerRecord = new ProducerRecord<>(topic, message);
        } else {
            producerRecord = new ProducerRecord<>(topic, partition, "", message);
        }
        if (!headers.isEmpty()) {
            for (Map.Entry<String, byte[]> entry : headers.entrySet()) {
                producerRecord.headers().add(new RecordHeader(entry.getKey(), entry.getValue()));
            }
        }
        @SuppressWarnings("unchecked")
        ListenableFuture<SendResult<String, String>> future = (ListenableFuture<SendResult<String, String>>) this.kafkaTemplate.getKafkaTemplate(kafkaServer).send(producerRecord);
        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            public void onSuccess(@SuppressWarnings("null") SendResult<String, String> result) {
                log.info("===> Sent message=[" + message + "] with offset=[" + result.getRecordMetadata().offset()
                        + "] to topic: " + topic + " SUCCESS !!!");
            }

            public void onFailure(@SuppressWarnings("null") Throwable ex) {
                log.info("xxxx> Unable to send message=[" + message + "] to topic: " + topic
                        + " FAIL !!! \n Due to : "
                        + ex.getMessage(), ex);
            }
        });
        try {
            future.get();
            return true;
        } catch (ExecutionException | InterruptedException e) {
            log.error(String.format("Send Message Async exception: %s", e.getMessage()), e);
            Thread.currentThread().interrupt();
            return false;
        }
    }
}
