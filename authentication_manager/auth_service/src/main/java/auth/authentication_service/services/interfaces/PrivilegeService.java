package auth.authentication_service.services.interfaces;

import auth.authentication_service.persistence.entities.Privilege;

import java.util.List;

public interface PrivilegeService {
    public Privilege createPrivilege(String privilegeName);
    public Privilege updatePrivilege(String privilegeName);
    public void deletePrivilege(String privilegeName);
    public List<Privilege> getAllPrivileges();
    public Privilege getPrivilegeByName(String name);
}
