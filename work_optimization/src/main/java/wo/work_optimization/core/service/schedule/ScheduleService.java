package wo.work_optimization.core.service.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import wo.work_optimization.core.domain.request.TaskRequestDTO;
import wo.work_optimization.core.domain.response.TaskResponseDTO;
import wo.work_optimization.core.domain.response.base.GeneralResponse;
import wo.work_optimization.core.domain.response.base.ResponseFactory;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.kernel.utils.JsonUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public abstract class ScheduleService<R, P> implements ScheduleConnector {
    @Autowired
    private ResponseFactory responseFactory;

    @Override
    public ResponseEntity<GeneralResponse<TaskResponseDTO>> schedule(TaskRequestDTO request) {
        try {
            checkOriginalId(request);
            validateRequest(request);
            R req = createRequest(request);
            P resp = doSchedule(req);
            return responseFactory.success(readResponse(mapResponse(request, resp)));
        } catch (BusinessException e) {
            log.error("Error while scheduling", e);
            return responseFactory.badRequest(readResponse(mapResponse(request, (P) e)));
        } catch (Exception e) {
            log.error("Error while scheduling", e);
            return responseFactory.internalServerError(readResponse(mapResponse(request, (P) e)));
        }
    }

    private void checkOriginalId(TaskRequestDTO request) {
        if (StringUtils.isEmpty(request.getOriginalTaskId())) {
            throw new BusinessException("OriginalId is required");
        }
    }

    private GeneralResponse<TaskResponseDTO> readResponse(TaskResponseDTO response) {
        return GeneralResponse.<TaskResponseDTO>builder()
                .data(response)
                .build();
    }

    public abstract void validateRequest(TaskRequestDTO request);
    public abstract P doSchedule(R request);
    public abstract R createRequest(TaskRequestDTO request);
    public abstract TaskResponseDTO mapResponse(TaskRequestDTO request, P response);

//    public String requestToString(R request) {
//        return JsonUtils.toJson(request);
//    }

}

