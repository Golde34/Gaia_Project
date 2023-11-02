package auth.authentication_service.utils;

import auth.authentication_service.modules.dto.PrivilegeDto;
import auth.authentication_service.modules.dto.RoleDto;
import auth.authentication_service.modules.dto.RegisterDto;
import auth.authentication_service.modules.dto.UserDto;
import auth.authentication_service.persistence.entities.Privilege;
import auth.authentication_service.persistence.entities.Role;
import auth.authentication_service.persistence.entities.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    // DTO -> Entity

    public User _mapperDtoToEntity(RegisterDto userDto) {
        return modelMapper().map(userDto, User.class);
    }
    public User _mapperDtoToEntity(UserDto userDto) {
        return modelMapper().map(userDto, User.class);
    }

    public Role _mapperDtoToEntity(RoleDto roleDto) {
        return modelMapper().map(roleDto, Role.class);
    }

    public Privilege _mapperDtoToEntity(PrivilegeDto privilegeDto) {
        return modelMapper().map(privilegeDto, Privilege.class);
    }

    // Entity -> DTO

    public UserDto _mapperEntityToDto(User user) {
        return modelMapper().map(user, UserDto.class);
    }

    public RoleDto _mapperEntityToDto(Role role) {
        return modelMapper().map(role, RoleDto.class);
    }

    public PrivilegeDto _mapperEntityToDto(Privilege privilege) {
        return modelMapper().map(privilege, PrivilegeDto.class);
    }
}
