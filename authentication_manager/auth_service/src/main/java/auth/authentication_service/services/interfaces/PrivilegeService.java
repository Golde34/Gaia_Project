package auth.authentication_service.services.interfaces;

import auth.authentication_service.persistence.entities.Privilege;

import java.util.List;

public interface PrivilegeService {
    public Privilege createPrivilege(Privilege privilege);
    public Privilege updatePrivilege(Privilege privilege);
    public void deletePrivilege(Privilege privilege);
    public List<Privilege> getAllPrivileges();
    public Privilege getPrivilegeByName(String name);
}
