package wo.work_optimization.infrastructure.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wo.work_optimization.core.domain.entity.TaskRegistration;

@Repository
public interface TaskRegistrationRepository extends JpaRepository<TaskRegistration, Long> {
    
}
