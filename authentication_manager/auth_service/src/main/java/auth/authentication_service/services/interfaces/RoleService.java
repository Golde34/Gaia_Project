package auth.authentication_service.services.interfaces;

import java.util.List;

import auth.authentication_service.persistence.entities.Role;

public interface RoleService {
    public Role createRole(Role role);
    public Role updateRole(Role role);
    public void deleteRole(Role role);
    public Role getRoleById(Long id);
    public List<Role> getAllRoles();
    public Role getRoleByName(String name);
}
