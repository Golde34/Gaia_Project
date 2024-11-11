package wo.work_optimization.core.service.factory;

import jakarta.annotation.PostConstruct;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.service.factory.schedule.schedule.ScheduleConnector;
import wo.work_optimization.core.service.factory.schedule.schedule.ScheduleFactory;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DefaultScheduleFactory implements ScheduleFactory {
    public static final Map<String, ScheduleConnector> scheduleServiceMap= new ConcurrentHashMap<>();
    private final List<ScheduleConnector> scheduleServices;

    @PostConstruct
    private void init() {
        scheduleServiceMap.putAll(scheduleServices.stream()
                .collect(Collectors.toMap(ScheduleConnector::method, Function.identity())));
    }

    @Override
    public ScheduleConnector get(@NonNull String method) {
        ScheduleConnector scheduleConnector = scheduleServiceMap.get(method);
        if (Objects.isNull(scheduleConnector)) {
            throw new BusinessException("Method not found");
        }
        return scheduleConnector;
    }
}
