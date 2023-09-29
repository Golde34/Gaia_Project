package auth.authentication_service.services.interfaces;

import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.entities.VerificationToken;

public interface UserService {
    
    User registerNewUserAccount(UserDto userDto);
    User getUser(String verificationToken);
    void saveRegisteredUser(User user);
    void deleteUser(User user);
    void createVerificationTokenForUser(User user, String token);
    VerificationToken getVerificationToken(String VerificationToken);
    VerificationToken generateNewVerificationToken(String token);
    void createPasswordResetTokenForUser(User user, String token);
    User findUserByEmail(String email);
    
}