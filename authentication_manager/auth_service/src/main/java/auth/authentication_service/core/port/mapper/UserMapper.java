package auth.authentication_service.core.port.mapper;

import org.springframework.stereotype.Component;

import auth.authentication_service.core.domain.dto.request.UpdateUserRequest;
import auth.authentication_service.core.domain.entities.User;

@Component
public class UserMapper {
    public User updateUserMapper(UpdateUserRequest updateUser, User user) {
        user.setId(updateUser.getUserId());
        user.setEmail(updateUser.getEmail());
        user.setName(updateUser.getName());
        user.setUsername(updateUser.getUsername());
        return user;
    }
}
