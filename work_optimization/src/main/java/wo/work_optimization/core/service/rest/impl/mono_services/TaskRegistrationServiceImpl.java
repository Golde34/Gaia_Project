package wo.work_optimization.core.service.rest.impl.mono_services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.dto.request.TaskRegistrationRequestDTO;
import wo.work_optimization.core.domain.dto.response.RegisteredTaskConfigStatus;
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
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>(requestValidation.getFirst(), ResponseMessage.msg400));
        }

        boolean isUserRegisteredTask = checkExistedTaskRegistration(request.getUserId());
        if (!isUserRegisteredTask) {
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>(Constants.ErrorMessage.EXISTED_USER, ResponseMessage.msg400));
        }

        TaskRegistration taskRegistration = createRequest(request);
        taskRegistrationStore.userRegisterTaskOperation(taskRegistration);
        return genericResponse.matchingResponseMessage(new GenericResponse<>(taskRegistration, ResponseMessage.msg200));
    }

    private Pair<String, Boolean> validateRequest(TaskRegistrationRequestDTO request) {
        if (dataUtils.isNullOrEmpty(request)
                || dataUtils.isNullOrEmpty(request.getUserId())
                || dataUtils.isNullOrEmpty(request.getWorkTime())
                || request.getWorkTime() <= 0) {
            return Pair.of(Constants.ErrorMessage.INVALID_REQUEST, false);
        }

        Pair<String, Boolean> isUserExisted = checkExistedUser(request.getUserId());
        if (!isUserExisted.getSecond()) {
            return Pair.of(isUserExisted.getFirst(), isUserExisted.getSecond());
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
            log.error("There is no information of user: {} in auth service", userId);
            return Pair.of(Constants.ErrorMessage.USER_NOT_FOUND, false);
        }

        return Pair.of(Constants.ErrorMessage.SUCCESS, true);
    }

    private boolean validateCalculatedTimeInDay(TaskRegistrationRequestDTO request) {
        double sum = request.getEatTime() + request.getRelaxTime() + request.getTravelTime() +
                request.getWorkTime() + request.getSleepDuration();
        return !(sum > 24) && !(sum < 24);
    }

    private boolean checkExistedTaskRegistration(Long userId) {
        log.info("Check existed user in task registration: [{}] ", userId);
        Optional<TaskRegistration> taskRegistration = taskRegistrationStore.getTaskRegistrationByUserId(userId);
        if (taskRegistration.isPresent()) {
            log.info("User has already registered task scheduling: [{}] ", userId);
            return false;
        }

        return true;
    }

    private TaskRegistration createRequest(TaskRegistrationRequestDTO request) {
        return TaskRegistration.builder()
                .userId(request.getUserId())
                .sleepDuration(request.getSleepDuration())
                .startSleepTime(request.getStartSleepTime())
                .endSleepTime(request.getEndSleepTime())
                .relaxTime(request.getRelaxTime())
                .travelTime(request.getTravelTime())
                .eatTime(request.getEatTime())
                .workTime(request.getWorkTime()).build();
    }

    @Override
    public GeneralResponse<?> userRegisterTaskInformation(TaskRegistrationRequestDTO request) {
        try {
            log.info("validate request: {}", request);
            Pair<String, Boolean> requestValidation = validateRequest(request);
            if (!requestValidation.getSecond()) {
                return genericResponse.matchingResponseMessage(
                        new GenericResponse<>(requestValidation.getFirst(), ResponseMessage.msg400));
            }

            boolean isUserRegisteredTask = checkExistedTaskRegistration(request.getUserId());
            if (isUserRegisteredTask) {
                return genericResponse.matchingResponseMessage(
                        new GenericResponse<>(Constants.ErrorMessage.USER_NOT_FOUND, ResponseMessage.msg400));
            }

            RegisteredTaskConfigStatus taskRegistration = RegisteredTaskConfigStatus.builder()
                    .isTaskConfigExist(true).build();
            return genericResponse
                    .matchingResponseMessage(new GenericResponse<>(taskRegistration, ResponseMessage.msg200));
        } catch (Exception e) {
            log.error("Error while getting user task information", e);
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>(Constants.ErrorMessage.INTERNAL_SERVER_ERROR, ResponseMessage.msg500));
        }
    }
}
