package auth.authentication_service.services;

import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.PasswordResetToken;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.entities.VerificationToken;
import auth.authentication_service.persistence.repositories.PasswordResetTokenRepository;
import auth.authentication_service.persistence.repositories.RoleRepository;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.persistence.repositories.VerificationTokenRepository;
import auth.authentication_service.services.interfaces.UserService;
import auth.authentication_service.utils.BCryptPasswordEncoder;
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


}
