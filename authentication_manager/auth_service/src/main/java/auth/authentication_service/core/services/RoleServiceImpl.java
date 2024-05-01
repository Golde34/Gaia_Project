package auth.authentication_service.core.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import auth.authentication_service.core.domain.constant.Constants;
import auth.authentication_service.core.domain.dto.PrivilegeDto;
import auth.authentication_service.core.domain.dto.RoleDto;
import auth.authentication_service.core.domain.dto.response.ListRole;
import auth.authentication_service.core.domain.entities.Privilege;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.domain.enums.LoggerType;
import auth.authentication_service.core.domain.enums.ResponseEnum;
import auth.authentication_service.core.port.store.RoleStore;
import auth.authentication_service.core.services.interfaces.RoleService;
import auth.authentication_service.core.validations.service_validations.RoleServiceValidation;
import auth.authentication_service.kernel.utils.GenericResponse;
import auth.authentication_service.kernel.utils.LoggerUtils;
import auth.authentication_service.kernel.utils.ModelMapperConfig;
import auth.authentication_service.kernel.utils.ResponseUtils;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    @Autowired
    private LoggerUtils _logger;
    @Autowired
    private ModelMapperConfig modelMapperConfig;
    @Autowired
    private GenericResponse<?> genericResponse;
    @Autowired
    private ResponseUtils responseUtils;

    private final RoleStore roleStore;
    private final RoleServiceValidation roleServiceValidation;

    public RoleServiceImpl(RoleStore roleStore, RoleServiceValidation roleServiceValidation) {
        this.roleStore = roleStore;
        this.roleServiceValidation = roleServiceValidation;
    }

    @Override
    public ResponseEntity<?> createRole(String roleName) {
        if (roleServiceValidation.checkExistRoleName(roleName)) {
            _logger.log("Create role failed", LoggerType.ERROR);
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>(Constants.ResponseMessage.ROLE_EXISTED, ResponseEnum.msg400));
        } else {
            Role newRole = new Role();
            newRole.setName(roleName);
            roleStore.save(newRole);
            _logger.log("Create role: " + roleName, LoggerType.INFO);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(newRole, ResponseEnum.msg201));
        }
    }

    @Override
    public ResponseEntity<?> updateRole(RoleDto roleDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            Pair<String, Boolean> canUpdateRole = roleServiceValidation.canUpdateRole(role, role.getName());
            if (!canUpdateRole.getSecond()) {
                return genericResponse
                        .matchingResponseMessage(new GenericResponse<>(canUpdateRole.getFirst(), ResponseEnum.msg400));
            }
            roleStore.save(role);
            return genericResponse.matchingResponseMessage(new GenericResponse<>(role, ResponseEnum.msg200));
        } catch (Exception e) {
            GenericResponse<String> response = responseUtils.returnMessage(
                    "Update Role failed: %s ".formatted(e.getMessage()), Constants.ResponseMessage.UPDATE_ROLE,
                    ResponseEnum.msg400);
            return genericResponse.matchingResponseMessage(response);
        }
    }

    @Override
    public ResponseEntity<?> deleteRole(RoleDto roleDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            if (roleServiceValidation.checkExistRole(role)) {
                roleStore.delete(role);
            }
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>("Role " + role.getName() + " deleted!", ResponseEnum.msg200));
        } catch (Exception e) {
            _logger.log("Delete role failed", LoggerType.ERROR);
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>(Constants.ResponseMessage.DELETE_ROLE, ResponseEnum.msg400));
        }
    }

    @Override
    @Cacheable(value = "roles")
    public ResponseEntity<?> getAllRoles() {
        log.info("Get all roles");
        List<ListRole> listRoles = new ArrayList<>();
        List<Role> roles = roleStore.findAll();
        final int[] totalUser = { 0 };
        roles.forEach(role -> {
            ListRole listRole = new ListRole();
            listRole.setId(role.getId());
            listRole.setName(role.getName());
            listRole.setNumberOfUsers(role.getUsers().size());
            totalUser[0] += role.getUsers().size();
            listRole.setTotalNumberOfUsers(totalUser[0]);
            listRole.setPrivileges(role.getPrivileges());
            listRoles.add(listRole);
        });

        return genericResponse.matchingResponseMessage(new GenericResponse<>(listRoles, ResponseEnum.msg200));
    }

    @Override
    public ResponseEntity<?> getRoleByName(RoleDto roleDto) {
        Role role = roleStore.findByName(roleDto.getName());
        return genericResponse.matchingResponseMessage(new GenericResponse<>(role, ResponseEnum.msg200));
    }

    @Override
    public ResponseEntity<?> addPrivilegeToRole(RoleDto roleDto, List<PrivilegeDto> privilegesDto) {
        try {
            Role role = modelMapperConfig._mapperDtoToEntity(roleDto);
            List<Privilege> privileges = _mapperListPrivilegesDto(privilegesDto);
            if (roleServiceValidation.checkExistRole(role)) {
                role.setPrivileges(privileges);
                roleStore.save(role);
                _logger.log("Add privilege to role: " + role.getName(), LoggerType.INFO);
                return genericResponse.matchingResponseMessage(new GenericResponse<>(role, ResponseEnum.msg200));
            }
        } catch (Exception e) {
            _logger.log("Add privilege to role failed", LoggerType.ERROR);
            return genericResponse.matchingResponseMessage(
                    new GenericResponse<>(Constants.ResponseMessage.ADD_PRIVILEGE_TO_ROLE, ResponseEnum.msg400));
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

    private List<Privilege> _mapperListPrivilegesDto(List<PrivilegeDto> privilegeDtos) {
        List<Privilege> privileges = new ArrayList<>();
        for (PrivilegeDto privilegeDto : privilegeDtos) {
            Privilege privilege = modelMapperConfig._mapperDtoToEntity(privilegeDto);
            privileges.add(privilege);
        }
        return privileges;
    }
}
