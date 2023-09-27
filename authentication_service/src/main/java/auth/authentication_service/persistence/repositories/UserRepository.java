package auth.authentication_service.persistence.repositories;

import auth.authentication_service.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);

    @Override
    void delete(User user);
}