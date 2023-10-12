package auth.authentication_service.services.interfaces;

import java.util.List;

import auth.authentication_service.persistence.entities.Privilege;
import auth.authentication_service.persistence.entities.Role;

public interface RoleService {
    public Role createRole(String roleName);
    public Role updateRole(String roleName);
    public void deleteRole(String roleName);
    public List<Role> getAllRoles();
    public Role getRoleByName(String roleName);
    public Role addPrivilegeToRole(String roleName, List<Privilege> privilegeNames);
}
