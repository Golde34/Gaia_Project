package wo.work_optimization.core.port.store;

import wo.work_optimization.core.domain.entity.TaskRegistration;

import java.util.Optional;

public interface TaskRegistrationStore {
    void userRegisterTaskOperation(TaskRegistration taskRegistration);
    Optional<TaskRegistration> getTaskRegistrationByUserId(Long id);
}
