package auth.authentication_service.persistence.repositories;

import auth.authentication_service.persistence.entities.VerificationToken;
import auth.authentication_service.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Date;
import java.util.stream.Stream;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    
    VerificationToken findByToken(String token);
    
    VerificationToken findByUser(User user);
    
    Stream<VerificationToken> findAllByExpiryDateLessThan(Date now);
    
    void deleteByExpiryDateLessThan(Date now);
    
    @Modifying
    @Query("delete from VerificationToken t where t.expiryDate <= ?1")
    void deleteAllExpiredSince(Date now);
}