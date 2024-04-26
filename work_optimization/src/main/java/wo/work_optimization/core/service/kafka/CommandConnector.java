package wo.work_optimization.core.service.kafka;

public interface CommandConnector {
    String command();
    void process(String message, String command);
}
