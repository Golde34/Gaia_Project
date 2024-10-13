package wo.work_optimization.core.usecase.kafka.impl;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.usecase.kafka.CommandService;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptimizeTaskCommand extends CommandService<String, String> {
    
    @Override
    public String command() {
        return TopicConstants.CreateTaskCommand.OPTIMIZE_TASK; 
    }

    @Override
    public String mapKafkaObject(Object kafkaObjectDto) {
        return kafkaObjectDto.toString();
    }

    @Override
    public void validateRequest(String request) {
        log.info("OptimizeTaskCommand validateRequest");
    }

    @Override
    public String doCommand(String request) {
        log.info("OptimizeTaskCommand doCommand");
        return "OptimizeTaskCommand doCommand";
    }
    

}
