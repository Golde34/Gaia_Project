package auth.authentication_service.services;

import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.entities.VerificationToken;
import auth.authentication_service.persistence.repositories.PasswordResetTokenRepository;
import auth.authentication_service.persistence.repositories.RoleRepository;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.persistence.repositories.VerificationTokenRepository;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.validations.EmailExistsException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Environment env;

    public static final String TOKEN_INVALID = "invalidToken";
    public static final String TOKEN_EXPIRED = "expired";
    public static final String TOKEN_VALID = "valid";

    @Override
    public User registerNewUserAccount(UserDto userDto) {
//        if (emailExist(userDto.getEmail())) {
//            throw new EmailExistsException("There is an account with that email adress: " + userDto.getEmail());
//        }
        User user = new User();
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUsing2FA(userDto.isUsing2FA());
        user.setRoles(Collections.singletonList(roleRepository.findByName("ROLE_USER")));
        return userRepository.save(user);
    }

    @Override
    public User getUser(String verificationToken) {
        final VerificationToken token = verificationTokenRepository.findByToken(verificationToken);
        if (token != null) {
            return token.getUser();
        }
        return null;
    }

    @Override
    public void saveRegisteredUser(final User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(final User user) {
        final VerificationToken verificationToken = verificationTokenRepository.findByUser(user);
        if (verificationToken != null) {
            verificationTokenRepository.delete(verificationToken);
        }
        final auth.authentication_service.persaistence.entities.PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByUser(user);
        if (passwordResetToken != null) {
            passwordResetTokenRepository.delete(passwordResetToken);
        }
        userRepository.delete(user);
    }

    @Override
    public void createVerificationTokenForUser(final User user, final String token) {
        final VerificationToken myToken = new VerificationToken(token, user);
        verificationTokenRepository.save(myToken);
    }
    
    @Override
    public VerificationToken getVerificationToken(final String verificationToken) {
        return verificationTokenRepository.findByToken(verificationToken);
    }

    @Override
    public VerificationToken generateNewVerificationToken(final String existingVerificationToken) {
        VerificationToken vToken = verificationTokenRepository.findByToken(existingVerificationToken);
        vToken.updateToken(UUID.randomUUID().toString());
        vToken = verificationTokenRepository.save(vToken);
        return vToken;
    }

    @Override
    public void createPasswordResetTokenForUser(final User user, final String token) {
        final auth.authentication_service.persaistence.entities.PasswordResetToken myToken = new auth.authentication_service.persaistence.entities.PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);
    }

    @Override
    public User findUserByEmail(final String email) {
        return userRepository.findByEmail(email);
    }
}
