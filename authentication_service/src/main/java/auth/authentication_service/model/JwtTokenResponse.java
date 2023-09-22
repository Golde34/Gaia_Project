package auth.authentication_service.model;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class JwtTokenResponse {
    private String token;
}