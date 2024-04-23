package wo.work_optimization.core.domain.kafka.base;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class KafkaBaseDto<T> {
    private String command;
    private String errorCode;
    private String errorMessage;
    private String displayTime;
    private T data;
}
