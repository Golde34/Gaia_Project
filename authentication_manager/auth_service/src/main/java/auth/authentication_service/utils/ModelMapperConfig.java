package auth.authentication_service.utils;

import auth.authentication_service.modules.dto.PrivilegeDto;
import auth.authentication_service.modules.dto.RoleDto;
import auth.authentication_service.modules.dto.RegisterDto;
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

    // private UserDto _mapperEntityToDto(User user) {
    //     return modelMapperConfig.modelMapper().map(user, UserDto.class);
    // }
    public User _mapperDtoToEntity(RegisterDto userDto) {
        return modelMapper().map(userDto, User.class);
    }

    // private RoleDto _mapperEntityToDto(Role role) {
    //     return modelMapperConfig.modelMapper().map(role, RoleDto.class);
    // }
    public Role _mapperDtoToEntity(RoleDto roleDto) {
        return modelMapper().map(roleDto, Role.class);
    }
    public Privilege _mapperDtoToEntity(PrivilegeDto privilegeDto) {
        return modelMapper().map(privilegeDto, Privilege.class);
    }
}
