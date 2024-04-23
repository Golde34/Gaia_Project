package wo.work_optimization.core.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "task")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;
    private String title;
    private int priority;
    private String status;
    private long startDate;
    private double duration;
    private long endDate;
    private String activeStatus;
    private String originalId;
}
