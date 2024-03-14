package wo.work_optimization.infrastructure.store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wo.work_optimization.core.domain.entity.TaskEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, String> {
    @Override
    void deleteById(String id);
    @Override
    void delete(TaskEntity entity);
    TaskEntity findByTitle(String title);
    Optional<TaskEntity> findById(String id);
    TaskEntity findByStatus(String status);
    TaskEntity findByPriority(int priority);
}
