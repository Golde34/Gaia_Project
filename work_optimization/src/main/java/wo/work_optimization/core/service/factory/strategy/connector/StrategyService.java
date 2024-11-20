package wo.work_optimization.core.service.factory.strategy.connector;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.entity.Task;

@Service
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("unchecked")
public abstract class StrategyService<R, P> implements StrategyConnector {

    @Override
    public List<Task> handleStrategy(Long userId) {
        try {
            validateRequest(userId);
            R req = createRequest(userId);
            P resp = doStrategy(req);
            return (List<Task>) mapResponse(userId, resp);
        } catch (Exception e) {
            log.error("Error while handling strategy", e);
            return Collections.emptyList();
        }
    }

    public void validateRequest(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User Id is required");
        }
    }

    public P doStrategy(R request) {
        return null;
    }

    public R createRequest(Long userId) {
        return null;
    }

    public TaskResponseDTO mapResponse(Long userId, P response) {
        return null;
    }
}
