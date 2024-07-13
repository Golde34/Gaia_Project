package wo.work_optimization.core.domain.dto;

import lombok.Data;

@Data
public class AuthServiceResponse<T> {
    private T message;
    private String responseMessage;
}
