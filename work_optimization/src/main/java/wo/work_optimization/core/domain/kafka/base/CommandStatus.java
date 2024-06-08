package wo.work_optimization.core.domain.kafka.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
@AllArgsConstructor
public class CommandStatus {
    private String command;
    private String errorCode;
    private String errorMessage;
    private String displayTime;
}
