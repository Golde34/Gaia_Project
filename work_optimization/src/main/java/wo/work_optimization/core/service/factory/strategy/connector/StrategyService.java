package wo.work_optimization.core.service.factory.strategy.connector;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.dto.response.base.ResponseFactory;
import wo.work_optimization.core.domain.enums.ResponseMessage;
import wo.work_optimization.kernel.utils.GenericResponse;

@Service
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("unchecked")
public abstract class StrategyService<R, P> implements StrategyConnector {
    
    private final ResponseFactory responseFactory;
    private GenericResponse<TaskResponseDTO> genericResponse;

    @Override
    public ResponseEntity<GeneralResponse<TaskResponseDTO>> handleStrategy(String strategyMode) {
        try {
            validateRequest(strategyMode);
            R req = createRequest(strategyMode);
            P resp = doStrategy(req);
            return responseFactory.success(readResponse(mapResponse(strategyMode, resp), ResponseMessage.msg200));
        } catch (Exception e) {
            log.error("Error while handling strategy", e);
            return responseFactory.internalServerError(readResponse(mapResponse(strategyMode, (P) e), ResponseMessage.msg400));
        }
    }

    private GeneralResponse<TaskResponseDTO> readResponse(TaskResponseDTO response, ResponseMessage responseMessage) {
        return (GeneralResponse<TaskResponseDTO>) genericResponse.matchingResponseMessage(new GenericResponse<>(response, responseMessage));
    }

    public void validateRequest(String strategyMode) {
        if (strategyMode == null) {
            throw new IllegalArgumentException("User Id is required");
        }
    }

    public P doStrategy(R request) {
        return null;
    }

    public R createRequest(String strategyMode) {
        return null;
    }

    public TaskResponseDTO mapResponse(String strategyMode, P response) {
        return null;
    }
}
