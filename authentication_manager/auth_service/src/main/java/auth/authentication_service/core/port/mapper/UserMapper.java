package auth.authentication_service.core.port.mapper;

import org.springframework.stereotype.Component;

import auth.authentication_service.core.domain.dto.request.UpdateUserRequest;
import auth.authentication_service.core.domain.entities.User;

@Component
public class UserMapper {
    public User updateUserMapper(UpdateUserRequest updateUser) {
        return User.builder()
                .id(updateUser.getUserId())
                .username(updateUser.getUsername())
                .name(updateUser.getName())
                .email(updateUser.getEmail())
                .build();
    }
}
