package auth.authentication_service.service;

import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@Service
public class UserDetailService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Load user by username: " + username);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String newPass = encoder.encode("483777");
        System.out.println("New pass: " + newPass);
        return new User("admin", newPass, new ArrayList<>());

    // Add access token in java user detail service
    // https://stackoverflow.com/questions/38679334/how-to-add-access-token-in-java-userdetailsservice

}