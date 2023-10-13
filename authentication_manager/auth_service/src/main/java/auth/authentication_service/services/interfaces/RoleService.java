package auth.authentication_service.services.interfaces;

import java.util.List;

import auth.authentication_service.modules.dto.PrivilegeDto;
import auth.authentication_service.modules.dto.RoleDto;
import auth.authentication_service.persistence.entities.Role;

public interface RoleService {
    public Role createRole(String roleName);
    public Role updateRole(RoleDto roleDto);
    public void deleteRole(RoleDto roleDto);
    public List<Role> getAllRoles();
    public Role getRoleByName(RoleDto roleDto);
    public Role addPrivilegeToRole(RoleDto roleDto, List<PrivilegeDto> privilegeNames);
}
