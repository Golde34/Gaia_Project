package wo.work_optimization.core.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@Table(name = "task_registration")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private Long userId;
    private String name;
    private Double maxWorkTime;
    private double constant1;
    private double constant2;
    private double constant3;

    private double sleepDuration;
    private Date startSleepTime;
    private Date endSleepTime;
    private double relaxTime;
    private double travelTime;
    private double eatTime;
    private double workTime;
    private int status;
}
