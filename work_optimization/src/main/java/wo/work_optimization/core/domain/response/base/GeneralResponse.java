package wo.work_optimization.core.domain.response.base;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GeneralResponse<T> {
    private String status;
    private String statusMessage;
    private Integer errorCode;
    private String errorMessage;
    private T data;


}
