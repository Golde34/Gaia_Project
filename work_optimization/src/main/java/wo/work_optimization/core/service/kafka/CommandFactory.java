package wo.work_optimization.core.service.kafka;

public interface CommandFactory {
    CommandConnector getCommand(String command);
}
