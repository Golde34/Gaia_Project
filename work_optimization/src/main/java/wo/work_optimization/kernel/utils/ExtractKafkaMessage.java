package wo.work_optimization.kernel.utils;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.kafka.base.CommandStatus;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@SuppressWarnings("rawtypes")
@Slf4j
public class ExtractKafkaMessage { 
    
    public static String getCommand(String messsage) {
        KafkaBaseDto kafkaBaseDto = extractMessage(messsage);
        return kafkaBaseDto.getCommand();
    }

    public static KafkaBaseDto getMessage(String message) {
        return extractMessage(message);
    }    

    public static CommandStatus getStatus(String message) {
        KafkaBaseDto kafkaBaseDto = extractMessage(message);
        return CommandStatus.builder()
                .command(kafkaBaseDto.getCommand())
                .errorCode(kafkaBaseDto.getErrorCode())
                .errorMessage(kafkaBaseDto.getErrorMessage())
                .displayTime(kafkaBaseDto.getDisplayTime())
                .build();
    }

    public static Object getData(String message) {
        return extractMessage(message).getData();
    }
    
    private static KafkaBaseDto extractMessage(String messageJson) {
        return JsonUtils.gson.fromJson(messageJson, KafkaBaseDto.class);
    }
}
