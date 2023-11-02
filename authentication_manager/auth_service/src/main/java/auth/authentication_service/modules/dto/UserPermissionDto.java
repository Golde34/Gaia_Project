package auth.authentication_service.modules.dto;

import lombok.Data;

@Data
public class UserPermissionDto {
    private Long userId;
    private String permission;
}
