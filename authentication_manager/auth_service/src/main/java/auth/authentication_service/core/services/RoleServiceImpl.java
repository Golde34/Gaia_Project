package auth.authentication_service.core.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import auth.authentication_service.core.domain.dto.PrivilegeDto;
import auth.authentication_service.core.domain.dto.RoleDto;
import auth.authentication_service.core.domain.dto.response.ListRole;
import auth.authentication_service.core.domain.entities.Privilege;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.domain.enums.LoggerType;
import auth.authentication_service.core.services.interfaces.RoleService;
import auth.authentication_service.core.store.RoleStore;
import auth.authentication_service.kernel.utils.LoggerUtils;
import auth.authentication_service.kernel.utils.ModelMapperConfig;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    @Autowired
    private LoggerUtils _logger;

    private final RoleStore roleStore;

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    public RoleServiceImpl(RoleStore roleStore) {
        this.roleStore = roleStore;
    }

    @Override
    public Role createRole(String roleName) {
        if (_checkExistRoleName(roleName)) {
            _logger.log("Create role failed", LoggerType.ERROR);
            throw new RuntimeException("Role existed");
        } else {
            Role newRole = new Role();
            newRole.setName(roleName);
            roleStore.save(newRole);
            _logger.log("Create role: " + roleName, LoggerType.INFO);
            return newRole;
        }
    }

    @Override
    public Role updateRole(RoleDto roleDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            if (_checkExistRole(role)) {
                if (!_checkExistRoleName(role.getName())) {
                    roleStore.save(role);
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
        } catch (Exception e) {
            _logger.log("Update role failed", LoggerType.ERROR);
            throw new RuntimeException("Update role failed");
        }
    }

    @Override
    public void deleteRole(RoleDto roleDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            if (_checkExistRole(role)) {
                roleStore.delete(role);
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
    @Cacheable(value = "roles")
    public List<ListRole> getAllRoles() {
        log.info("Get all roles");
        List<ListRole> listRoles = new ArrayList<>();
        List<Role> roles = roleStore.findAll();
        final int[] totalUser = {0};
        roles.forEach(role -> {
            ListRole listRole = new ListRole();
            listRole.setId(role.getId());
            listRole.setName(role.getName());
            listRole.setNumberOfUsers(role.getUsers().size());
            totalUser[0] += role.getUsers().size();
            listRole.setTotalNumberOfUsers(totalUser[0]);
            listRoles.add(listRole);
        });

        return listRoles;
    }

    @Override
    public Role getRoleByName(RoleDto roleDto) {
        return roleStore.findByName(roleDto.getName());
    }

    @Override
    public Role addPrivilegeToRole(RoleDto roleDto, List<PrivilegeDto> privilegesDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            List<Privilege> privileges = _mapperListPrivilegesDto(privilegesDto);
            if (_checkExistRole(role)) {
                role.setPrivileges(privileges);
                roleStore.save(role);
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
            for (Role item : roleStore.findAll()) {
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
            for (Role item : roleStore.findAll()) {
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
        List<Privilege> privileges = new ArrayList<>();
        for (PrivilegeDto privilegeDto : privilegeDtos) {
            Privilege privilege = modelMapperConfig._mapperDtoToEntity(privilegeDto);
            privileges.add(privilege);
        }
        return privileges;
    }
}
