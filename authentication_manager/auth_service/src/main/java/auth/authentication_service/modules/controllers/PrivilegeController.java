package auth.authentication_service.modules.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Privilege> createPrivilege(String privilegeName) {
        Privilege privilege = privilegeService.createPrivilege(privilegeName);
        return ResponseEntity.ok(privilege);
    }

    @RequestMapping(value = "/updatePrivilege", method = RequestMethod.POST)
    public ResponseEntity<Privilege> updatePrivilege(String privilegeName) {
        Privilege privilege = privilegeService.updatePrivilege(privilegeName);
        return ResponseEntity.ok(privilege);
    }

    @RequestMapping(value = "/deletePrivilege", method = RequestMethod.POST)
    public ResponseEntity<String> deletePrivilege(String privilegeName) {
        privilegeService.deletePrivilege(privilegeName);
        return ResponseEntity.ok("Delete privilege successfully");
    }

    @RequestMapping(value = "/getAllPrivileges")
    public ResponseEntity<List<Privilege>> getAllPrivileges() {
        List<Privilege> privileges = privilegeService.getAllPrivileges();
        return ResponseEntity.ok(privileges);
    }

    @RequestMapping(value = "/getPrivilege")
    public ResponseEntity<Privilege> getPrivilege(String privilegeName) {
        Privilege privilege = privilegeService.getPrivilegeByName(privilegeName);
        return ResponseEntity.ok(privilege);
    }    
}
