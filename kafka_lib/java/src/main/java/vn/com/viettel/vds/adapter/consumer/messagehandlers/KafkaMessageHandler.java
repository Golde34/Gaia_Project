package vn.com.viettel.vds.adapter.consumer.messagehandlers;

public abstract class KafkaMessageHandler {
     public abstract String getTopic();
     public abstract void processMessage(String message, String topic);
}
