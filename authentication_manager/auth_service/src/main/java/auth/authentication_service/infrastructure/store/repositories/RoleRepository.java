package auth.authentication_service.infrastructure.store.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import auth.authentication_service.core.domain.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Role findByName(String name);

    Role findRoleById(Long Id);

    @Override
    void delete(Role role);
}