package wo.work_optimization.infrastructure.store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wo.work_optimization.core.domain.entity.ParentTask;

@Repository
public interface ParentTaskRepository extends JpaRepository<ParentTask, Long> {
    @SuppressWarnings("unchecked")
    ParentTask save(ParentTask parentTask);
    Optional<ParentTask> findByGroupTaskId(String groupTaskId);
    Optional<List<ParentTask>> findByProjectId(String projectId);
    Optional<ParentTask> findBySchedulePlanId(String scheduleId);
    List<ParentTask> findAll();
    List<ParentTask> findByUserId(long userId);
}
