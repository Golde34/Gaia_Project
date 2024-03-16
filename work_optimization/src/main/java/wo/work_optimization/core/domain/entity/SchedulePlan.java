package wo.work_optimization.core.domain.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "schedule_plan")
public class SchedulePlan {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private String userId;
    private List<Task> tasks;
    private long startDate;
    private long endDate;
    private String status;
}
