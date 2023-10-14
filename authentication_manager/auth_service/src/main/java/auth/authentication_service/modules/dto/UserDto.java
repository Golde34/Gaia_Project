package auth.authentication_service.modules.dto;

import lombok.Data;

@Data
public class UserDto {

    public Long id;
    public String username;
    public String name;
    public String email;

}
