package wo.work_optimization.core.service.monoservices;

import java.text.ParseException;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.ValidateConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.core.validation.TaskValidation;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

public interface TaskService {
    void createTask(String message);
}
