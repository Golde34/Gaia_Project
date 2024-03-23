package auth.authentication_service.core.services.interfaces;

import org.springframework.http.ResponseEntity;

import auth.authentication_service.core.domain.dto.PrivilegeDto;

public interface PrivilegeService {
    public ResponseEntity<?> createPrivilege(String privilegeName);
    public ResponseEntity<?> updatePrivilege(PrivilegeDto privilegeDto);
    public ResponseEntity<?> deletePrivilege(PrivilegeDto privilegeDto);
    public ResponseEntity<?> getAllPrivileges();
    public ResponseEntity<?> getPrivilegeByName(PrivilegeDto privilegeDto);
}
