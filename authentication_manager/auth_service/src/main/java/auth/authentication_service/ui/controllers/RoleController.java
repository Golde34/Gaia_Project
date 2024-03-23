package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.dto.RoleDto;
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

    @RequestMapping(value = "/create-role", method = RequestMethod.POST)
    public ResponseEntity<?> createRole(@RequestBody RoleDto roleDto) {
        return roleService.createRole(roleDto.getName());
    }

    @RequestMapping(value = "/update-role", method = RequestMethod.PUT)
    public ResponseEntity<?> updateRole(@RequestBody RoleDto roleDto) {
        return roleService.updateRole(roleDto);
    }

    @RequestMapping(value = "/delete-role", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteRole(@RequestBody RoleDto roleDto) {
        return roleService.deleteRole(roleDto);
    }

    @RequestMapping(value = "/get-all-roles", method = RequestMethod.GET)
    public ResponseEntity<?> getAllRoles() {
        return roleService.getAllRoles();
    }
    
    @RequestMapping(value = "/get-role", method = RequestMethod.GET)
    public ResponseEntity<?> getRole(@RequestBody RoleDto roleDto) {
        return roleService.getRoleByName(roleDto);
    }

    @RequestMapping(value = "/add-privilege-to-role", method = RequestMethod.PUT)
    public ResponseEntity<?> addPrivilegeToRole(@RequestBody RoleDto roleDto) {
        return roleService.addPrivilegeToRole(roleDto, roleDto.getPrivileges());
    }
}
