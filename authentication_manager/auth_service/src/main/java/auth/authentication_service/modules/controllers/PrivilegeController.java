package auth.authentication_service.modules.controllers;

import java.util.List;

import auth.authentication_service.modules.dto.PrivilegeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auth.authentication_service.persistence.entities.Privilege;
import auth.authentication_service.services.interfaces.PrivilegeService;

@RestController
@RequestMapping("/privilege")
public class PrivilegeController {
    
    @Autowired
    private PrivilegeService privilegeService;

    @RequestMapping(value = "/createPrivilege", method = RequestMethod.POST)
    public ResponseEntity<Privilege> createPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        Privilege privilege = privilegeService.createPrivilege(privilegeDto.getName());
        return ResponseEntity.ok(privilege);
    }

    @RequestMapping(value = "/updatePrivilege", method = RequestMethod.POST)
    public ResponseEntity<Privilege> updatePrivilege(@RequestBody PrivilegeDto privilegeDto) {
        Privilege privilege = privilegeService.updatePrivilege(privilegeDto.getName());
        return ResponseEntity.ok(privilege);
    }

    @RequestMapping(value = "/deletePrivilege", method = RequestMethod.POST)
    public ResponseEntity<String> deletePrivilege(@RequestBody PrivilegeDto privilegeDto) {
        privilegeService.deletePrivilege(privilegeDto.getName());
        return ResponseEntity.ok("Delete privilege successfully");
    }

    @RequestMapping(value = "/getAllPrivileges")
    public ResponseEntity<List<Privilege>> getAllPrivileges() {
        List<Privilege> privileges = privilegeService.getAllPrivileges();
        return ResponseEntity.ok(privileges);
    }

    @RequestMapping(value = "/getPrivilege")
    public ResponseEntity<Privilege> getPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        Privilege privilege = privilegeService.getPrivilegeByName(privilegeDto.getName());
        return ResponseEntity.ok(privilege);
    }    
}
