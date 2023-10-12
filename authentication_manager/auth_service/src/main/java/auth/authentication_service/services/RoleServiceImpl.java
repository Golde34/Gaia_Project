package auth.authentication_service.services;

import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.persistence.entities.Privilege;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.repositories.RoleRepository;
import auth.authentication_service.services.interfaces.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
    
    final Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    @Autowired
    private RoleRepository roleRepository;

    public RoleServiceImpl (RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override 
    public Role createRole(String roleName) {
        if (_checkExistRole(roleName)) {
            _logger("Create role failed", LoggerType.ERROR);
            throw new RuntimeException("Role existed");
        } else {
            Role newRole = new Role();
            newRole.setName(roleName);
            roleRepository.save(newRole);
            _logger("Create role: " + roleName, LoggerType.INFO);
            return newRole;
        }
    }
    
    @Override 
    public Role updateRole(String roleName){
        try {
            if (_checkExistRole(roleName)) {
                Role role = getRoleByName(roleName);
                roleRepository.save(role);
                _logger("Update role: " + role.getName(), LoggerType.INFO);
                return role;
            } else {
                _logger("Role not found", LoggerType.INFO);
                throw new RuntimeException("Role not found");
            }
        } catch (Exception e){
            _logger("Update role failed", LoggerType.ERROR);
            throw new RuntimeException("Update role failed");
        }
    }

    @Override 
    public void deleteRole(String roleName) {
        try {
            if (_checkExistRole(roleName)) {
                Role role = getRoleByName(roleName);
                roleRepository.delete(role);
                _logger("Delete role: " + role.getName(), LoggerType.INFO);
            } else {
                _logger("Role not found", LoggerType.INFO);
                throw new RuntimeException("Role not found");
            }
        } catch (Exception e) {
            _logger("Delete role failed", LoggerType.ERROR);
            throw new RuntimeException("Delete role failed");
        }
    }
    
    @Override 
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override 
    public Role getRoleByName(String roleName) {
        return roleRepository.findByName(roleName);
    }

    @Override
    public Role addPrivilegeToRole(String roleName, List<Privilege> privileges) {
        try { 
            Role role = getRoleByName(roleName);
            if (role == null) {
                throw new Exception("Role not found");
            } else {
                role.setPrivileges(privileges);
                roleRepository.save(role);
                _logger("Add privilege to role: " + role.getName(), LoggerType.INFO);
                return role;
            }
        } catch (Exception e) {
            _logger("Add privilege to role failed", LoggerType.ERROR);
            throw new RuntimeException("Add privilege to role failed");
        }
    }

    private boolean _checkExistRole(String roleName) {
        try {
            for (Role role: roleRepository.findAll()) {
                if (Objects.equals(role.getName(), roleName)) {
                    return true;
                }
            } 
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Check exist role failed", LoggerType.ERROR);
        }
        return false;
    }
    private void _logger(String message, LoggerType loggerType) {
        if (loggerType == LoggerType.ERROR) { logger.error(message);}
        if (loggerType == LoggerType.INFO) { logger.info(message);}
        if (loggerType == LoggerType.DEBUG) { logger.debug(message);}
        if (loggerType == LoggerType.TRACE) { logger.trace(message);}
        if (loggerType == LoggerType.WARN) { logger.warn(message);}
    }
}
