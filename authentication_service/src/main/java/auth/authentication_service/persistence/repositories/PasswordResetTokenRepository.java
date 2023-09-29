package auth.authentication_service.persistence.repositories;

import auth.authentication_service.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.stream.Stream;

public interface PasswordResetTokenRepository extends JpaRepository<auth.authentication_service.persaistence.entities.PasswordResetToken, Long> {

    auth.authentication_service.persaistence.entities.PasswordResetToken findByToken(String token);

    auth.authentication_service.persaistence.entities.PasswordResetToken findByUser(User user);

    Stream<auth.authentication_service.persaistence.entities.PasswordResetToken> findAllByExpiryDateLessThan(Date now);

    void deleteByExpiryDateLessThan(Date now);

    @Modifying
    @Query("delete from PasswordResetToken t where t.expiryDate <= ?1")
    void deleteAllExpiredSince(Date now);
}