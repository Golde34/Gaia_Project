package wo.work_optimization.core.service.rest.impl.mono_services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        // validate request
        boolean requestValidation = validateRequest(request);
        if (!requestValidation) {
            return genericResponse.matchingResponseMessage(new GenericResponse<>("There is an error when registry task scheduling.", ResponseMessage.msg400));
        }
        // mapper request to entity
        TaskRegistration taskRegistration = createRequest(request);
        // store db
        taskRegistrationStore.userRegisterTaskOperation(taskRegistration);
        // return response
        return genericResponse.matchingResponseMessage(new GenericResponse<>(taskRegistration, ResponseMessage.msg200));

    }
    
    private boolean validateRequest(TaskRegistrationRequestDTO request) {
        if (dataUtils.isNullOrEmpty(request)) {
            return false;
        }
        if (dataUtils.isNullOrEmpty(request.getUserId())) {
            return false;
        }
        if (dataUtils.isNullOrEmpty(request.getWorkTime())) {
            return false;
        }
        if (request.getWorkTime() <= 0) {
            return false;
        }
        if (!checkExistedUser(request.getUserId())) {
            return false;
        }
        if (!validateCalculatedTimeInDay(request)) {
            return false;
        }
        return true;
    }
    private boolean checkExistedUser(Long userId) {
        // check existed user in auth service
        UserResponseDTO response = authServiceClient.getExistedUser(userId);
        log.info("Check existed user in auth service: [{}] ", response.toString());
        if (dataUtils.isNullOrEmpty(response) || dataUtils.isNullOrEmpty(response.getId())) {
            log.error("There is no information of user: {} in auth service", userId);
            return false;
        }

        log.info("Check existed user in task registration: [{}] ", userId);
        Optional<TaskRegistration> taskRegistration = taskRegistrationStore.getTaskRegistrationByUserId(userId);
        if (taskRegistration.isPresent()) {
            log.error("User has already registered task scheduling: {}", userId);
            return false;
        }

        log.info("There is no information of user: {} in task registration. Can initiate task registration information", userId);
        return true;
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
