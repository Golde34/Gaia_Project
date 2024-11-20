package wo.work_optimization.core.service.factory;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import io.micrometer.common.lang.NonNull;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyConnector;
import wo.work_optimization.core.service.factory.strategy.connector.StrategyFactory;

@Service
@RequiredArgsConstructor
public class DefaultStrategyFactory implements StrategyFactory {

    public static final Map<String, StrategyConnector> strategyServiceMap = new ConcurrentHashMap<>();
    private final List<StrategyConnector> strategyConnectors;

    @PostConstruct
    private void init() {
        strategyServiceMap.putAll(strategyConnectors.stream()
                .collect(Collectors.toMap(StrategyConnector::strategy, Function.identity())));
    }
    
    @Override
    public StrategyConnector get(String strategy) {
        StrategyConnector strategyConnector = strategyServiceMap.get(strategy);
        if (Objects.isNull(strategyConnector)) {
            throw new BusinessException("Strategy not found");
        }
        return strategyConnector;
    }
}
