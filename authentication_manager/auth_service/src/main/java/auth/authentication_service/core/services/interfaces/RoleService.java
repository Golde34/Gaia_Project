package auth.authentication_service.core.services.interfaces;

import java.util.Collection;
import java.util.List;

import org.springframework.http.ResponseEntity;

import auth.authentication_service.core.domain.dto.PrivilegeDto;
import auth.authentication_service.core.domain.dto.RoleDto;
import auth.authentication_service.core.domain.entities.Role;

public interface RoleService {
    public ResponseEntity<?> createRole(String roleName);
    public ResponseEntity<?> updateRole(RoleDto roleDto);
    public ResponseEntity<?> deleteRole(RoleDto roleDto);
    public ResponseEntity<?> getAllRoles();
    public ResponseEntity<?> getRoleByName(RoleDto roleDto);
    public ResponseEntity<?> addPrivilegeToRole(RoleDto roleDto, List<PrivilegeDto> privilegeNames);
    public Role getBiggestRole(Collection<Role> roles);
}
