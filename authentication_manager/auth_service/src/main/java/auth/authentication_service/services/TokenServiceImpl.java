package auth.authentication_service.services;

import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.User;
import auth.authentication_service.persistence.repositories.UserRepository;
import auth.authentication_service.securities.UserDetailsServices;
import auth.authentication_service.services.interfaces.TokenService;
import auth.authentication_service.utils.JwtUtil;
import auth.authentication_service.utils.ModelMapperConfig;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ModelMapperConfig modelMapper;

    private final JwtUtil jwtUtil;
    private final UserDetailsServices userDetailsServices;

    public TokenServiceImpl(JwtUtil jwtUtil, UserDetailsServices userDetailsServices) {
        this.jwtUtil = jwtUtil;
        this.userDetailsServices = userDetailsServices;
    }

    @Override
    public String generateAccessToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 2; // 2h
        return jwtUtil.generateToken(user, expiration);
    }

    @Override
    public String generateRefreshToken(UserDetails user) {
        Long expiration = 1000L * 60 * 60 * 24; // 1d
        return jwtUtil.generateToken(user, expiration);
    }

    @Override
    public String getUsernameFromToken(String accessToken) {
        return jwtUtil.exactUsername(accessToken);
    }

    @Override
    public Date getExpirationDateFromToken(String token) {
        return jwtUtil.extractExpiration(token);
    }

    @Override
    public UserDto checkToken(String token) {
        // find user by token
        String username = jwtUtil.exactUsername(token);
        UserDetails userDetails = userDetailsServices.loadUserByUsername(username);
        if (jwtUtil.validateToken(token, userDetails)) {
            User user = userRepository.findByUsername(username);
            UserDto userDto = modelMapper._mapperEntityToDto(user);
            return userDto;
        } else {
            return null;
        }
    }

    @Override
    public Boolean validateToken(String token) {
        String username = jwtUtil.exactUsername(token);
        UserDetails userDetails = userDetailsServices.loadUserByUsername(username);
        return jwtUtil.validateToken(token, userDetails);
    }

}
