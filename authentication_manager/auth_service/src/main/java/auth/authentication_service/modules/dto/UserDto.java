package auth.authentication_service.modules.dto;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String username;
    private String name;
    private String email;


}
