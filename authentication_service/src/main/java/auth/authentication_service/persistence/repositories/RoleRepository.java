package auth.authentication_service.persistence.repositories;

import auth.authentication_service.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Role findByName(String name);

    @Override
    void delete(Role role);
}