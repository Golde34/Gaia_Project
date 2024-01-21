package auth.authentication_service.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import auth.authentication_service.modules.dto.PrivilegeDto;
import auth.authentication_service.modules.dto.RoleDto;
import auth.authentication_service.utils.LoggerUtils;
import auth.authentication_service.utils.ModelMapperConfig;

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

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    @Override 
    public Role createRole(String roleName) {
        if (_checkExistRoleName(roleName)) {
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
    public Role updateRole(RoleDto roleDto){
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            if (_checkExistRole(role)) {
                if (!_checkExistRoleName(role.getName())) {
                    roleRepository.save(role);
                    _logger.log("Update role: " + role.getName(), LoggerType.INFO);
                    return role;
                } else {
                    _logger.log("Role name existed!", LoggerType.ERROR);
                    throw new RuntimeException("Role name existed");
                }
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
    public void deleteRole(RoleDto roleDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            if (_checkExistRole(role)) {
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
    public Role getRoleByName(RoleDto roleDto) {
        return roleRepository.findByName(roleDto.getName());
    }

    @Override
    public Role addPrivilegeToRole(RoleDto roleDto, List<PrivilegeDto> privilegesDto) {
        try { 
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            List<Privilege> privileges = _mapperListPrivilegesDto(privilegesDto);
            if (_checkExistRole(role)) {
                role.setPrivileges(privileges);
                roleRepository.save(role);
                _logger.log("Add privilege to role: " + role.getName(), LoggerType.INFO);
                return role;
            }
        } catch (Exception e) {
            _logger.log("Add privilege to role failed", LoggerType.ERROR);
            throw new RuntimeException("Add privilege to role failed");
        }
        return null;
    }

    @Override
    public Role getBiggestRole(Collection<Role> roles) {
        try {
            Role biggestRole = roles.stream().max((role1, role2) -> role1.getId().compareTo(role2.getId())).get();
            return biggestRole;
        } catch (Exception e) {
            _logger.log("Get biggest role failed", LoggerType.ERROR);
            throw new RuntimeException("Get biggest role failed");
        }
    }

    private boolean _checkExistRole(Role role) {
        try {
            for (Role item: roleRepository.findAll()) {
                if (Objects.equals(item.getId(), role.getId())) {
                    return true;
                }
            } 
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist role failed", LoggerType.ERROR);
        }
        return false;
    }

    private boolean _checkExistRoleName(String roleName) {
        try {
            for (Role item: roleRepository.findAll()) {
                if (Objects.equals(item.getName(), roleName)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist role name failed", LoggerType.ERROR);
        }
        return false;
    }

    private List<Privilege> _mapperListPrivilegesDto(List<PrivilegeDto> privilegeDtos) {
        List<Privilege> privileges= new ArrayList<>();
        for (PrivilegeDto privilegeDto: privilegeDtos) {
            Privilege privilege = modelMapperConfig._mapperDtoToEntity(privilegeDto);
            privileges.add(privilege);
        }
        return privileges;
    }
}
