package auth.authentication_service.persistence.repositories;

import auth.authentication_service.persistence.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Role findByName(String name);

    Role findRoleById(Long Id);

    @Override
    void delete(Role role);
}