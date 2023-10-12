package auth.authentication_service.services;

import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auth.authentication_service.enums.LoggerType;
import auth.authentication_service.persistence.entities.Privilege;
import auth.authentication_service.persistence.repositories.PrivilegeRepository;
import auth.authentication_service.services.interfaces.PrivilegeService;

@Service
public class PrivilegeServiceImpl implements PrivilegeService{
    
    final Logger logger = LoggerFactory.getLogger(PrivilegeServiceImpl.class);
    
    @Autowired
    private PrivilegeRepository privilegeRepository;

    public PrivilegeServiceImpl(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    } 

    @Override
    public Privilege createPrivilege(String privilegeName) {
        if (_checkExistPrivilege(privilegeName)) {
            _logger("Check exist privilege failed", LoggerType.ERROR);
            throw new RuntimeException("Privilege existed");
        } else {
            Privilege newPrivilege = new Privilege();
            newPrivilege.setName(privilegeName);
            privilegeRepository.save(newPrivilege);
            _logger("Create privilege: " + privilegeName, LoggerType.INFO);
            return newPrivilege;
        }
    }
    
    @Override
    public Privilege updatePrivilege(String privilegeName) {
        try {
            if (_checkExistPrivilege(privilegeName)) {
                Privilege privilege = getPrivilegeByName(privilegeName);
                privilegeRepository.save(privilege);
                _logger("Update privilege: " + privilege.getName(), LoggerType.INFO);
                return privilege;
            } else {
                _logger("Privilege not found", LoggerType.INFO);
                throw new RuntimeException("Privilege not found");
            }
        } catch (Exception e) {
            _logger("Update privilege failed", LoggerType.ERROR);
            throw new RuntimeException("Update privilege failed");
        }
    }

    @Override
    public void deletePrivilege(String privilegeName) {
        try {
            if (_checkExistPrivilege(privilegeName)) {
                Privilege privilege = getPrivilegeByName(privilegeName);
                privilegeRepository.delete(privilege);
                _logger("Delete privilege: " + privilege.getName(), LoggerType.INFO);
            } else {
                _logger("Privilege not found", LoggerType.INFO);
                throw new RuntimeException("Privilege not found");
            }
        } catch (Exception e) {
            _logger("Delete privilege failed", LoggerType.ERROR);
            throw new RuntimeException("Delete privilege failed");
        }
    }

    @Override
    public List<Privilege> getAllPrivileges() {
        return privilegeRepository.findAll();
    }

    @Override
    public Privilege getPrivilegeByName(String name) {
        return privilegeRepository.findByName(name);
    }

    private boolean _checkExistPrivilege(String privilegeName) {
        try {
            for (Privilege privilege: privilegeRepository.findAll()) {
                if (Objects.equals(privilege.getName(), privilegeName)) {
                    return true;
                }
            } 
        } catch (Exception e) {
            e.printStackTrace();
            _logger("Check exist privilege failed", LoggerType.ERROR);
        }
        return false;
    }
    private void _logger(String message, LoggerType loggerType) {
        if (loggerType == LoggerType.ERROR) { logger.error(message);}
        if (loggerType == LoggerType.INFO) { logger.info(message);}
        if (loggerType == LoggerType.DEBUG) { logger.debug(message);}
        if (loggerType == LoggerType.TRACE) { logger.trace(message);}
        if (loggerType == LoggerType.WARN) { logger.warn(message);}
    }

}
