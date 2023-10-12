package auth.authentication_service.modules.controllers;

import java.util.List;

import auth.authentication_service.modules.dto.RoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.services.interfaces.RoleService;

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
        Role role = roleService.updateRole(roleDto.getName());
        return ResponseEntity.ok(role);
    }

    @RequestMapping(value = "/deleteRole", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteRole(@RequestBody RoleDto roleDto) {
        roleService.deleteRole(roleDto.getName());
        return ResponseEntity.ok("Delete role successfully");
    }

    @RequestMapping(value = "/getAllRoles", method = RequestMethod.GET)
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }
    
    @RequestMapping(value = "/getRole", method = RequestMethod.GET)
    public ResponseEntity<Role> getRole(@RequestBody RoleDto roleDto) {
        Role role = roleService.getRoleByName(roleDto.getName());
        return ResponseEntity.ok(role);
    }
}
