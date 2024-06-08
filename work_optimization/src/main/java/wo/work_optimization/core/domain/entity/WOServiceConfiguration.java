package wo.work_optimization.core.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class WOServiceConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entity;
    private String paramName;
    private String paramValue;
    private String description;
    private String status;
}
