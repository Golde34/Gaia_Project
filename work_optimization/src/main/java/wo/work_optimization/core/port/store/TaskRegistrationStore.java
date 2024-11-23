package wo.work_optimization.core.port.store;

import wo.work_optimization.core.domain.entity.TaskRegistration;

import java.util.Optional;

public interface TaskRegistrationStore {
    void userRegisterTaskOperation(TaskRegistration taskRegistration);
    Optional<TaskRegistration> getTaskRegistrationByUserId(Long id);
    Optional<TaskRegistration> getTaskRegistrationByTaskId(String taskId);
    int updateUserConstant(long userId, double c1, double c2, double c3);
}
