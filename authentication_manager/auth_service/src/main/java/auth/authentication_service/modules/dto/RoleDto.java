package auth.authentication_service.modules.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoleDto {

    private Long id;
    private String name;
    private List<PrivilegeDto> privileges;
}
