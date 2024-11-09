package wo.work_optimization.infrastructure.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wo.work_optimization.core.domain.entity.Task;

import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    
    Task findByOriginalId(String originalId);
    
    @Override
    void deleteById(String id);
    @Override
    void delete(Task entity);
    Task findByTitle(String title);
    Optional<Task> findById(String id);
    Task findByStatus(String status);
    Task findByPriority(int priority);
    Optional<Task> findByIdAndScheduleTaskId(String id, String scheduleTaskId);
    Optional<Task> findByIdAndScheduleTaskIdAndOriginalId(String taskId, String scheduleTaskId, String id);
}
