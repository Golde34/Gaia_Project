package auth.authentication_service.ui.controllers;

import auth.authentication_service.core.domain.dto.PrivilegeDto;
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
    public ResponseEntity<?> createPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        return privilegeService.createPrivilege(privilegeDto.getName());
    }

    @RequestMapping(value = "/update-privilege", method = RequestMethod.POST)
    public ResponseEntity<?> updatePrivilege(@RequestBody PrivilegeDto privilegeDto) {
        return privilegeService.updatePrivilege(privilegeDto);
    }

    @RequestMapping(value = "/delete-privielge", method = RequestMethod.POST)
    public ResponseEntity<?> deletePrivilege(@RequestBody PrivilegeDto privilegeDto) {
        return privilegeService.deletePrivilege(privilegeDto);
    }

    @RequestMapping(value = "/get-all-privileges")
    public ResponseEntity<?> getAllPrivileges() {
        return privilegeService.getAllPrivileges();
    }

    @RequestMapping(value = "/get-privilege")
    public ResponseEntity<?> getPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        return privilegeService.getPrivilegeByName(privilegeDto);
    }    
}
