package wo.work_optimization.kernel.utils;

import wo.work_optimization.core.domain.kafka.base.CommandStatus;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;

@SuppressWarnings("rawtypes")
public class ExtractKafkaMessage { 
    
    public static String getCommand(String messsage) {
        KafkaBaseDto kafkaBaseDto = extractMessage(messsage);
        return kafkaBaseDto.getCmd();
    }

    public static KafkaBaseDto getMessage(String message) {
        return extractMessage(message);
    }    

    public static CommandStatus getStatus(String message) {
        KafkaBaseDto kafkaBaseDto = extractMessage(message);
        return CommandStatus.builder()
                .command(kafkaBaseDto.getCmd())
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
