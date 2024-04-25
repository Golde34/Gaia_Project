package wo.work_optimization.core.port.kafka;

public interface MessageProcessingStrategy {
    void process(String message, String command);
}
