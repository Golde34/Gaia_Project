package auth.authentication_service.core.services.interfaces;

import java.util.Collection;
import java.util.List;

import auth.authentication_service.core.domain.dto.PrivilegeDto;
import auth.authentication_service.core.domain.dto.RoleDto;
import auth.authentication_service.core.domain.entities.Role;

public interface RoleService {
    public Role createRole(String roleName);
    public Role updateRole(RoleDto roleDto);
    public void deleteRole(RoleDto roleDto);
    public List<Role> getAllRoles();
    public Role getRoleByName(RoleDto roleDto);
    public Role addPrivilegeToRole(RoleDto roleDto, List<PrivilegeDto> privilegeNames);
    public Role getBiggestRole(Collection<Role> roles);
}
