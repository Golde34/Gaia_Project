package wo.work_optimization.core.domain.entity;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "schedule_plan")
public class SchedulePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String userId;

    private long startDate;
    private long endDate;
    private String status;

    @JsonManagedReference
    @OneToMany
    @JoinTable(name = "schedule_task",
            joinColumns = @JoinColumn(name = "schedule_plan_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"))
    private Collection<Task> tasks;
}
