package auth.authentication_service.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import auth.authentication_service.persistence.entities.AuthToken;

public interface TokenRepository extends JpaRepository<AuthToken, Long>{
    
    AuthToken findByUser(Long id);

}
