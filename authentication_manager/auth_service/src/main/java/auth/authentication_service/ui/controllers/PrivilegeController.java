package auth.authentication_service.ui.controllers;

import java.util.List;

import auth.authentication_service.core.domain.dto.PrivilegeDto;
import auth.authentication_service.core.domain.entities.Privilege;
import auth.authentication_service.core.services.interfaces.PrivilegeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/privilege")
public class PrivilegeController {
    
    @Autowired
    private PrivilegeService privilegeService;

    @RequestMapping(value = "/create-privilege", method = RequestMethod.POST)
    public ResponseEntity<Privilege> createPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        Privilege privilege = privilegeService.createPrivilege(privilegeDto.getName());
        return ResponseEntity.ok(privilege);
    }

    @RequestMapping(value = "/update-privilege", method = RequestMethod.POST)
    public ResponseEntity<Privilege> updatePrivilege(@RequestBody PrivilegeDto privilegeDto) {
        Privilege privilege = privilegeService.updatePrivilege(privilegeDto);
        return ResponseEntity.ok(privilege);
    }

    @RequestMapping(value = "/delete-privielge", method = RequestMethod.POST)
    public ResponseEntity<String> deletePrivilege(@RequestBody PrivilegeDto privilegeDto) {
        privilegeService.deletePrivilege(privilegeDto);
        return ResponseEntity.ok("Delete privilege successfully");
    }

    @RequestMapping(value = "/get-all-privileges")
    public ResponseEntity<List<Privilege>> getAllPrivileges() {
        List<Privilege> privileges = privilegeService.getAllPrivileges();
        return ResponseEntity.ok(privileges);
    }

    @RequestMapping(value = "/get-privilege")
    public ResponseEntity<Privilege> getPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        Privilege privilege = privilegeService.getPrivilegeByName(privilegeDto);
        return ResponseEntity.ok(privilege);
    }    
}
