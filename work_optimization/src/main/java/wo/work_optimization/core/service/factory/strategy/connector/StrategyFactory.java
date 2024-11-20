package wo.work_optimization.core.service.factory.strategy.connector;

public interface StrategyFactory {
    StrategyConnector get(String strategyMode); 
}
