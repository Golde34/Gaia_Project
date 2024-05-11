package wo.work_optimization.infrastructure.store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import wo.work_optimization.core.domain.entity.WOServiceConfiguration;

@Repository
public interface WOServiceRepository extends JpaRepository<WOServiceConfiguration, Long> {
    @Query("select c from WOServiceConfiguration c where c.paramName = :paramName")
    Optional<WOServiceConfiguration> findParam(String paramName);
}
