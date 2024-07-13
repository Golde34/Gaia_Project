package wo.work_optimization.core.port.store;

import wo.work_optimization.core.domain.entity.TaskRegistration;

public interface TaskRegistrationStore {
    void userRegisterTaskOperation(TaskRegistration taskRegistration);
}
