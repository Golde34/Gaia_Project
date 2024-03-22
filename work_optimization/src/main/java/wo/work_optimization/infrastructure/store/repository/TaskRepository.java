package wo.work_optimization.infrastructure.store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wo.work_optimization.core.domain.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    @Override
    void deleteById(String id);
    @Override
    void delete(Task entity);
    Task findByTitle(String title);
    Optional<Task> findById(String id);
    Task findByStatus(String status);
    Task findByPriority(int priority);
}
