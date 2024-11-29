package wo.work_optimization.core.service.factory;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.service.factory.option.connector.OptionConnector;
import wo.work_optimization.core.service.factory.option.connector.OptionFactory;

@Service
@RequiredArgsConstructor
public class DefaultOptionFactory implements OptionFactory {
    
    public static final Map<String, OptionConnector> optionServiceMap = new ConcurrentHashMap<>();
    private final List<OptionConnector> optionConnectors;

    @PostConstruct
    private void init() {
        optionServiceMap.putAll(optionConnectors.stream()
                .collect(Collectors.toMap(OptionConnector::option, Function.identity())));
    }

    @Override
    public OptionConnector get(String option) {
        OptionConnector optionConnector = optionServiceMap.get(option);
        if (Objects.isNull(optionConnector)) {
            throw new BusinessException("Option not found");
        }
        return optionConnector;
    }
}
