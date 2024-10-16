package wo.work_optimization.core.domain.kafka.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class KafkaBaseDto<T> {
    private String cmd;
    private String errorCode;
    private String errorMessage;
    private String displayTime;
    private T data;
}
