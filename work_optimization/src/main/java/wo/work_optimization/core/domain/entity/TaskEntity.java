package wo.work_optimization.core.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "task")
public class TaskEntity {
    private String id;
    private String title;
    private int priority;
    private String status;
    private long startDate;
    private double duration;
    private long endDate;
    private boolean activeStatus;
}
