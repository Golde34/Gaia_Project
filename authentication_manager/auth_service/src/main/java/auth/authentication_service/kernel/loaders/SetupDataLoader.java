package auth.authentication_service.kernel.loaders;

import auth.authentication_service.core.domain.entities.Privilege;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.domain.entities.User;
import auth.authentication_service.infrastructure.repositories.PrivilegeRepository;
import auth.authentication_service.infrastructure.repositories.RoleRepository;
import auth.authentication_service.infrastructure.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // API

    @Override
    @Transactional
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        if (alreadySetup) {
            return;
        }

        // == create initial privileges  
        final Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        final Privilege writPrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");
        final Privilege passwordPrivilege = createPrivilegeIfNotFound("CHANGE_PASSWORD_PRIVILEGE");
        final Privilege readRole = createPrivilegeIfNotFound("READ_ROLE");
        final Privilege writeRole = createPrivilegeIfNotFound("WRITE_ROLE");
        final Privilege readUser = createPrivilegeIfNotFound("READ_USER");
        final Privilege writeUser = createPrivilegeIfNotFound("WRITE_USER");
        final Privilege readTaskService = createPrivilegeIfNotFound("READ_TASK_SERVICE");
        final Privilege writeTaskService = createPrivilegeIfNotFound("WRITE_TASK_SERVICE");
  
        // == create initial roles
        final List<Privilege> bossPrivileges = new ArrayList<>(Arrays.asList(readPrivilege, writPrivilege, passwordPrivilege, readRole, writeRole, readUser, writeUser, readTaskService, writeTaskService));
        final List<Privilege> authAdminPrivileges = new ArrayList<>(Arrays.asList(readPrivilege, readRole, readUser, writeUser));
        final List<Privilege> serviceUserPrivileges = new ArrayList<>(Arrays.asList(readTaskService, writeTaskService));

        final Role bossRole = createRoleIfNotFound("ROLE_BOSS", bossPrivileges);
        final Role adminRole = createRoleIfNotFound("ROLE_ADMIN", authAdminPrivileges);
        createRoleIfNotFound("ROLE_USER", serviceUserPrivileges);

        // == create initial user
        createUserIfNotFound("nguyendongducviet2001@gmail.com", "Nguyen Dong Duc Viet", "golde", "483777", new ArrayList<>(Arrays.asList(bossRole)));
        createUserIfNotFound("test@test.com", "Test", "Test", "test", new ArrayList<>(Arrays.asList(adminRole)));

        alreadySetup = true;
    }

    @Transactional
    public Privilege createPrivilegeIfNotFound(final String name) {
        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilege = privilegeRepository.save(privilege);
        }
        return privilege;
    }

    @Transactional
    public Role createRoleIfNotFound(final String name, final Collection<Privilege> privileges) {
        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
        }
        role.setPrivileges(privileges);
        role = roleRepository.save(role);
        return role;
    }

    @Transactional
    public User createUserIfNotFound(final String email, final String name, final String username, final String password, final Collection<Role> roles) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            user = new User();
            user.setName(name);
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setEmail(email);
            user.setEnabled(true);
        }
        user.setRoles(roles);
        user = userRepository.save(user);
        return user;
    }
}