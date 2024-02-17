package auth.authentication_service.core.services;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auth.authentication_service.core.domain.dto.PrivilegeDto;
import auth.authentication_service.core.domain.entities.Privilege;
import auth.authentication_service.core.domain.enums.LoggerType;
import auth.authentication_service.core.services.interfaces.PrivilegeService;
import auth.authentication_service.core.store.PrivilegeStore;
import auth.authentication_service.kernel.utils.LoggerUtils;
import auth.authentication_service.kernel.utils.ModelMapperConfig;

@Service
public class PrivilegeServiceImpl implements PrivilegeService{

    @Autowired
    private LoggerUtils _logger;

    private final PrivilegeStore privilegeStore;

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    public PrivilegeServiceImpl(PrivilegeStore privilegeStore) {
        this.privilegeStore = privilegeStore;
    }

    @Override
    public Privilege createPrivilege(String privilegeName) {
        if (_checkExistPrivilegeName(privilegeName)) {
            _logger.log("Create privilege failed", LoggerType.ERROR);
            throw new RuntimeException("Privilege existed");
        } else {
            Privilege newPrivilege = new Privilege();
            newPrivilege.setName(privilegeName);
            privilegeStore.save(newPrivilege);
            _logger.log("Create privilege: " + privilegeName, LoggerType.INFO);
            return newPrivilege;
        }
    }

    @Override
    public Privilege updatePrivilege(PrivilegeDto privilegeDto){
        try {
            Privilege privilege = modelMapperConfig._mapperDtoToEntity(privilegeDto);
            if (_checkExistPrivilege(privilege)) {
                if (!_checkExistPrivilegeName(privilege.getName())) {
                    privilegeStore.save(privilege);
                    _logger.log("Update privilege: " + privilege.getName(), LoggerType.INFO);
                    return privilege;
                } else {
                    _logger.log("Privilege name existed!", LoggerType.ERROR);
                    throw new RuntimeException("Privilege name existed");
                }
            } else {
                _logger.log("Privilege not found", LoggerType.INFO);
                throw new RuntimeException("Privilege not found");
            }
        } catch (Exception e){
            _logger.log("Update privilege failed", LoggerType.ERROR);
            throw new RuntimeException("Update privilege failed");
        }
    }

    @Override
    public void deletePrivilege(PrivilegeDto privilegeDto) {
        try {
            Privilege privilege = modelMapperConfig._mapperDtoToEntity(privilegeDto);
            if (_checkExistPrivilege(privilege)) {
                privilegeStore.delete(privilege);
                _logger.log("Delete privilege: " + privilege.getName(), LoggerType.INFO);
            } else {
                _logger.log("Privilege not found", LoggerType.INFO);
                throw new RuntimeException("Privilege not found");
            }
        } catch (Exception e) {
            _logger.log("Delete privilege failed", LoggerType.ERROR);
            throw new RuntimeException("Delete privilege failed");
        }
    }

    @Override
    public List<Privilege> getAllPrivileges() {
        return privilegeStore.findAll();
    }

    @Override
    public Privilege getPrivilegeByName(PrivilegeDto privilegeDto) {
        return privilegeStore.findByName(privilegeDto.getName());
    }

    private boolean _checkExistPrivilege(Privilege privilege) {
        try {
            for (Privilege item: privilegeStore.findAll()) {
                if (Objects.equals(item.getId(), privilege.getId())) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist privilege failed", LoggerType.ERROR);
        }
        return false;
    }

    private boolean _checkExistPrivilegeName(String privilegeName) {
        try {
            for (Privilege item: privilegeStore.findAll()) {
                if (Objects.equals(item.getName(), privilegeName)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            _logger.log("Check exist privilege name failed", LoggerType.ERROR);
        }
        return false;
    }

}
