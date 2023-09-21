package auth.authentication_service.model;

import lombok.Data;

@Data
public class User {
    private String username;
    private String password;
}