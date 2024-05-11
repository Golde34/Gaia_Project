package wo.work_optimization.core.service.rest.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import wo.work_optimization.core.domain.dto.request.TaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.enums.ResponseMessage;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.dto.response.base.ResponseFactory;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.kernel.utils.GenericResponse;
import wo.work_optimization.kernel.utils.JsonUtils;

@Slf4j
@RequiredArgsConstructor
@Service
@SuppressWarnings("unchecked")
public abstract class ScheduleService<R, P> implements ScheduleConnector {
    @Autowired
    private ResponseFactory responseFactory;
    @Autowired
    private GenericResponse<TaskResponseDTO> genericResponse;

    @Override
    public ResponseEntity<GeneralResponse<TaskResponseDTO>> schedule(TaskRequestDTO request) {
        try {
            checkOriginalId(request);
            validateRequest(request);
            R req = createRequest(request);
            P resp = doSchedule(req);
            return responseFactory.success(readResponse(mapResponse(request, resp), ResponseMessage.msg200));
        } catch (BusinessException e) {
            log.error("Error while scheduling", e);
            return responseFactory.badRequest(readResponse(mapResponse(request, (P) e), ResponseMessage.msg400));
        } catch (Exception e) {
            log.error("Error while scheduling", e);
            return responseFactory.internalServerError(readResponse(mapResponse(request, (P) e), ResponseMessage.msg500));
        }
    }

    private void checkOriginalId(TaskRequestDTO request) {
        if (!StringUtils.hasText(request.getOriginalTaskId())) {
            throw new BusinessException("OriginalId is required");
        }
    }

    private GeneralResponse<TaskResponseDTO> readResponse(TaskResponseDTO response, ResponseMessage responseMessage) {
        return genericResponse.matchingResponseMessage(new GenericResponse<>(response, responseMessage));
    }

    public abstract void validateRequest(TaskRequestDTO request);
    public abstract P doSchedule(R request);
    public abstract R createRequest(TaskRequestDTO request);
    public abstract TaskResponseDTO mapResponse(TaskRequestDTO request, P response);

    public String requestToString(R request) {
        return JsonUtils.toJson(request);
    }

    public String responseToString(P response) {
        return JsonUtils.toJson(response);
    }
}

