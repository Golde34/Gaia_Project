package auth.authentication_service.persistence.repositories;

import auth.authentication_service.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);

    @Override
    void delete(User user);
}