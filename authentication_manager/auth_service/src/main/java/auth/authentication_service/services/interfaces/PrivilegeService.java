package auth.authentication_service.services.interfaces;

import auth.authentication_service.modules.dto.PrivilegeDto;
import auth.authentication_service.persistence.entities.Privilege;

import java.util.List;

public interface PrivilegeService {
    public Privilege createPrivilege(String privilegeName);
    public Privilege updatePrivilege(PrivilegeDto privilegeDto);
    public void deletePrivilege(PrivilegeDto privilegeDto);
    public List<Privilege> getAllPrivileges();
    public Privilege getPrivilegeByName(PrivilegeDto privilegeDto);
}
