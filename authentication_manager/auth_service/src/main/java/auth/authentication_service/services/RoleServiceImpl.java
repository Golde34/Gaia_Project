package auth.authentication_service.services;

import java.util.List;
import java.util.Objects;

import auth.authentication_service.utils.LoggerUtils;
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
    
   @Autowired
   private LoggerUtils _logger;

    @Autowired
    private RoleRepository roleRepository;

    public RoleServiceImpl (RoleRepository roleRepository, LoggerUtils _logger) {
        this.roleRepository = roleRepository;
        this._logger = _logger;
    }

    @Override 
    public Role createRole(String roleName) {
        if (_checkExistRole(roleName)) {
            _logger.log("Create role failed", LoggerType.ERROR);
            throw new RuntimeException("Role existed");
        } else {
            Role newRole = new Role();
            newRole.setName(roleName);
            roleRepository.save(newRole);
            _logger.log("Create role: " + roleName, LoggerType.INFO);
            return newRole;
        }
    }
    
    @Override 
    public Role updateRole(String roleName){
        try {
            if (_checkExistRole(roleName)) {
                Role role = getRoleByName(roleName);
                roleRepository.save(role);
                _logger.log("Update role: " + role.getName(), LoggerType.INFO);
                return role;
            } else {
                _logger.log("Role not found", LoggerType.INFO);
                throw new RuntimeException("Role not found");
            }
        } catch (Exception e){
            _logger.log("Update role failed", LoggerType.ERROR);
            throw new RuntimeException("Update role failed");
        }
    }

    @Override 
    public void deleteRole(String roleName) {
        try {
            if (_checkExistRole(roleName)) {
                Role role = getRoleByName(roleName);
                roleRepository.delete(role);
                _logger.log("Delete role: " + role.getName(), LoggerType.INFO);
            } else {
                _logger.log("Role not found", LoggerType.INFO);
                throw new RuntimeException("Role not found");
            }
        } catch (Exception e) {
            _logger.log("Delete role failed", LoggerType.ERROR);
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
                _logger.log("Add privilege to role: " + role.getName(), LoggerType.INFO);
                return role;
            }
        } catch (Exception e) {
            _logger.log("Add privilege to role failed", LoggerType.ERROR);
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
            _logger.log("Check exist role failed", LoggerType.ERROR);
        }
        return false;
    }
}
