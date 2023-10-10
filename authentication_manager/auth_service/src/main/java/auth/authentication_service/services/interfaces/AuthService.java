package auth.authentication_service.services.interfaces;

public interface AuthService{
    public String authenticated(String username, String password) throws Exception;
    public String getUsernameFromToken(String accessToken);
    public boolean validateAccessToken(String accessToken);
    public boolean validateRefreshToken(String refreshToken);
}
