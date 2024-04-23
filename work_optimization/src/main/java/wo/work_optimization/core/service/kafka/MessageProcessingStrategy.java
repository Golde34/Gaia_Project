package wo.work_optimization.core.service.kafka;

public interface MessageProcessingStrategy {
    void process(String message, String command);
}
