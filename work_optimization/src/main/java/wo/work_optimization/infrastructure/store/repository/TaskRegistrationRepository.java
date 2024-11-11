package wo.work_optimization.infrastructure.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import wo.work_optimization.core.domain.entity.TaskRegistration;

import java.util.Optional;

@Repository
public interface TaskRegistrationRepository extends JpaRepository<TaskRegistration, Long> {
    Optional<TaskRegistration> findByUserIdAndStatus(Long userId, int status);

    @Query("select tr from TaskRegistration tr join ParentTask pt on pt.userId = tr.userId join Task t on t.parentTask.id = pt.id where t.id = :taskId")
    Optional<TaskRegistration> findByTaskId(@Param("taskId") String taskId);
}
