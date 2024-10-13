package wo.work_optimization.core.usecase.kafka;

public interface CommandFactory {
    CommandConnector getCommand(String command);
}
