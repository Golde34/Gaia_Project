package wo.work_optimization.core.port.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.request.CreateTaskRequestDTO;

@Configuration
public class TaskMapper {

    @Bean
    ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    public Task toEntity(Object request) {
        CreateTaskRequestDTO createTaskRequestDTO = modelMapper().map(request, CreateTaskRequestDTO.class);
        Task task = new Task();
        task.setTitle(createTaskRequestDTO.getTitle());
        return task;
    }
}
