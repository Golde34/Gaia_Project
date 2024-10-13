package wo.work_optimization.core.usecase.kafka;

public interface CommandConnector {
    String command();
    void process(String message, String command);
}
