package wo.work_optimization.core.usecase.kafka;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;
import wo.work_optimization.kernel.utils.JsonUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public abstract class CommandService<R, P> implements CommandConnector {
    
    @Override
    public void process(String message, String cmd) {
        try {
            Object kafkaObjectDto = ExtractKafkaMessage.getData(message);
            R request = mapKafkaObject(kafkaObjectDto);
            validateRequest(request);
            P resp = doCommand(request);
            log.info("Response: {}", resp);
            // push to logging tracker by Kafka 
        } catch (BusinessException e) {
            log.error(String.format("Business Error while handling command: %s", e.getMessage()), e);
            return;
        } catch (Exception ex) {
            log.error(String.format("Error while handling command: %s", ex.getMessage()), ex);
            return;
        }
    }

    public abstract R mapKafkaObject(Object kafkaObjectDto);
    public abstract void validateRequest(R request);
    public abstract P doCommand(R request);

    public String requestToString(R request) {
        return JsonUtils.toJson(request);
    }

    public String responseToString(P response) {
        return JsonUtils.toJson(response);
    }
}
