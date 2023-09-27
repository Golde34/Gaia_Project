package auth.authentication_service.persistence.repositories;

import auth.authentication_service.entities.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
    
    Privilege findByName(String name);

    @Override
    void delete(Privilege privilege);
}
