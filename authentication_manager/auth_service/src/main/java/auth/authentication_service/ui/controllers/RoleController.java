package auth.authentication_service.ui.controllers;

import java.util.List;

import auth.authentication_service.core.domain.dto.RoleDto;
import auth.authentication_service.core.domain.entities.Role;
import auth.authentication_service.core.services.interfaces.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {
   
    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/createRole", method = RequestMethod.POST)
    public ResponseEntity<Role> createRole(@RequestBody RoleDto roleDto) {
        Role role = roleService.createRole(roleDto.getName());
        return ResponseEntity.ok(role);
    }

    @RequestMapping(value = "/updateRole", method = RequestMethod.PUT)
    public ResponseEntity<Role> updateRole(@RequestBody RoleDto roleDto) {
        Role role = roleService.updateRole(roleDto);
        return ResponseEntity.ok(role);
    }

    @RequestMapping(value = "/deleteRole", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteRole(@RequestBody RoleDto roleDto) {
        roleService.deleteRole(roleDto);
        return ResponseEntity.ok("Delete role successfully");
    }

    @RequestMapping(value = "/getAllRoles", method = RequestMethod.GET)
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }
    
    @RequestMapping(value = "/getRole", method = RequestMethod.GET)
    public ResponseEntity<Role> getRole(@RequestBody RoleDto roleDto) {
        Role role = roleService.getRoleByName(roleDto);
        return ResponseEntity.ok(role);
    }

    @RequestMapping(value = "/addPrivilegeToRole", method = RequestMethod.PUT)
    public ResponseEntity<Role> addPrivilegeToRole(@RequestBody RoleDto roleDto) {
        Role role = roleService.addPrivilegeToRole(roleDto, roleDto.getPrivileges());
        return ResponseEntity.ok(role);
    }
}
