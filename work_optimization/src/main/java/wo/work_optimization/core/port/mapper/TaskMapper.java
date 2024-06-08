package wo.work_optimization.core.port.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.enums.TaskPriorityEnum;
import wo.work_optimization.core.domain.dto.request.CreateTaskRequestDTO;
import wo.work_optimization.kernel.utils.DateTimeUtils;

import java.text.ParseException;
import java.util.Arrays;

@Configuration
public class TaskMapper {

    @Bean
    ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    public Task toEntity(Object request) throws ParseException {
        CreateTaskRequestDTO createTaskRequestDTO = modelMapper().map(request, CreateTaskRequestDTO.class);
        return Task.builder()
                .title(createTaskRequestDTO.getTitle())
                .status(createTaskRequestDTO.getStatus())
                .startDate(DateTimeUtils.convertStringDateTime(createTaskRequestDTO.getStartDate()))
                .duration(createTaskRequestDTO.getDuration())
                .endDate(DateTimeUtils.convertStringDateTime(createTaskRequestDTO.getDeadline()))
                .activeStatus(createTaskRequestDTO.getActiveStatus())
                .originalId(createTaskRequestDTO.getId())
                .priority(calculateTaskWeight(createTaskRequestDTO.getPriority()))
                .build();
    }

    private int calculateTaskWeight(String[] priorities) {
        return Arrays.stream(priorities)
                .mapToInt(this::convertTaskPriority)
                .sum();
    }

    private int convertTaskPriority(String priority) {
        TaskPriorityEnum taskPriorityEnum = TaskPriorityEnum.of(priority);
        return switch (taskPriorityEnum) {
            case HIGH -> taskPriorityEnum.getWeight();
            case MEDIUM -> taskPriorityEnum.getWeight();
            case LOW -> taskPriorityEnum.getWeight();
            case STAR -> taskPriorityEnum.getWeight();
            default -> 0;
        };
    }
}
 