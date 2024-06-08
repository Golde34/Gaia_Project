package wo.work_optimization.core.service.kafka;

import jakarta.annotation.PostConstruct;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.exception.BusinessException;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommandHandleFactory implements CommandFactory{

    public static final Map<String, CommandConnector> commandConnectorMap = new ConcurrentHashMap<>();
    private final List<CommandConnector> commandConnectors;

    @PostConstruct
    private void init() {
        commandConnectorMap.putAll(commandConnectors.stream()
                .collect(Collectors.toMap(CommandConnector::command, Function.identity())));
    }

    @Override
    public CommandConnector getCommand(@NonNull String command) {
        CommandConnector commandConnector = commandConnectorMap.get(command);
        if (Objects.isNull(commandConnector)) {
            throw new BusinessException("Command not found: " + command);
        }
        return commandConnector;
    }
}
