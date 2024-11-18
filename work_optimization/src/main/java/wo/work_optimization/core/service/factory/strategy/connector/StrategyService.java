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
    public ResponseEntity<GeneralResponse<TaskResponseDTO>> handleStrategy(Long userId) {
        try {
            validateRequest(userId);
            R req = createRequest(userId);
            P resp = doStrategy(req);
            return responseFactory.success(readResponse(mapResponse(userId, resp), ResponseMessage.msg200));
        } catch (Exception e) {
            log.error("Error while handling strategy", e);
            return responseFactory.internalServerError(readResponse(mapResponse(userId, (P) e), ResponseMessage.msg400));
        }
    }

    private GeneralResponse<TaskResponseDTO> readResponse(TaskResponseDTO response, ResponseMessage responseMessage) {
        return (GeneralResponse<TaskResponseDTO>) genericResponse.matchingResponseMessage(new GenericResponse<>(response, responseMessage));
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
