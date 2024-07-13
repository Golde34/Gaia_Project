package wo.work_optimization.core.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponseDTO {
    private Long id;
    private String name;
    private String username;
    private String email;
}
