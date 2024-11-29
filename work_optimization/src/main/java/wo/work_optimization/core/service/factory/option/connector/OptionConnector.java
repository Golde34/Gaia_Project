package wo.work_optimization.core.service.factory.option.connector;

public interface OptionConnector {
    String option();
    boolean handleOption(long userId);
}
