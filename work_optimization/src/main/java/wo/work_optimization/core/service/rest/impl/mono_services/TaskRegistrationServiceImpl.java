package wo.work_optimization.core.service.rest.impl.mono_services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.TaskResponseDTO;
import wo.work_optimization.core.domain.dto.response.UserResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.entity.TaskRegistration;
import wo.work_optimization.core.domain.enums.ResponseMessage;
import wo.work_optimization.core.port.client.AuthServiceClient;
import wo.work_optimization.core.port.store.TaskRegistrationStore;
import wo.work_optimization.core.service.rest.TaskRegistrationService;
import wo.work_optimization.kernel.utils.DataUtils;
import wo.work_optimization.kernel.utils.GenericResponse;

import java.util.Optional;

@Slf4j
@Service
public class TaskRegistrationServiceImpl implements TaskRegistrationService {

    @Autowired
    private AuthServiceClient authServiceClient;
    @Autowired
    private TaskRegistrationStore taskRegistrationStore;

    @Autowired
    private DataUtils dataUtils;
    @Autowired
    private GenericResponse<TaskResponseDTO> genericResponse;

    public GeneralResponse<?> registerWorkOptimization(TaskRegistrationRequestDTO request) {
        log.info("Validate request: {}", request);
        Pair<String, Boolean> requestValidation = validateRequest(request);
        if (!requestValidation.getSecond()) {
            return genericResponse.matchingResponseMessage(new GenericResponse<>(requestValidation.getFirst(), ResponseMessage.msg400));
        }

        TaskRegistration taskRegistration = createRequest(request);
        taskRegistrationStore.userRegisterTaskOperation(taskRegistration);
        return genericResponse.matchingResponseMessage(new GenericResponse<>(taskRegistration, ResponseMessage.msg200));
    }
    
    private Pair<String, Boolean> validateRequest(TaskRegistrationRequestDTO request) {
        if (dataUtils.isNullOrEmpty(request)
                || dataUtils.isNullOrEmpty(request.getUserId())
                || dataUtils.isNullOrEmpty(request.getWorkTime())
                || request.getWorkTime() <= 0
        ) {
            return Pair.of(Constants.ErrorMessage.INVALID_REQUEST, false);
        }
        if (!checkExistedUser(request.getUserId()).getSecond()) {
            return Pair.of(Constants.ErrorMessage.USER_NOT_FOUND, false);
        }
        if (!validateCalculatedTimeInDay(request)) {
            return Pair.of(Constants.ErrorMessage.TOTAL_TIME_IN_DAY_ERROR, false);
        }
        return Pair.of(Constants.ErrorMessage.SUCCESS, true);
    }
    private Pair<String, Boolean> checkExistedUser(Long userId) {
        // check existed user in auth service
        UserResponseDTO response = authServiceClient.getExistedUser(userId);
        log.info("Check existed user in auth service: [{}] ", response.toString());
        if (dataUtils.isNullOrEmpty(response) || dataUtils.isNullOrEmpty(response.getId())) {
            String error = "There is no information of user: " + userId + " in auth service";
            log.error(error);
            return Pair.of(error, false);
        }

        log.info("Check existed user in task registration: [{}] ", userId);
        Optional<TaskRegistration> taskRegistration = taskRegistrationStore.getTaskRegistrationByUserId(userId);
        if (taskRegistration.isPresent()) {
            String error = "User has already registered task scheduling: " + userId;
            log.error(error);
            return Pair.of(error, false);
        }

        log.info("There is no information of user: {} in task registration. Can initiate task registration information", userId);
        return Pair.of(Constants.ErrorMessage.OK, true);
    }

    private boolean validateCalculatedTimeInDay(TaskRegistrationRequestDTO request) {
        double sum = request.getEatTime() + request.getRelaxTime() + request.getTravelTime() +
                request.getWorkTime() + request.getSleepTime().getSleepDuration();
        return !(sum > 24) && !(sum < 24);
    }

    private TaskRegistration createRequest(TaskRegistrationRequestDTO request) {
        return TaskRegistration.builder()
                .userId(request.getUserId())
                .sleepDuration(request.getSleepTime().getSleepDuration())
                .startSleepTime(request.getSleepTime().getStartSleepTime())
                .endSleepTime(request.getSleepTime().getEndSleepTime())
                .relaxTime(request.getRelaxTime())
                .travelTime(request.getTravelTime())
                .eatTime(request.getEatTime())
                .workTime(request.getWorkTime()).build();
    }
}
