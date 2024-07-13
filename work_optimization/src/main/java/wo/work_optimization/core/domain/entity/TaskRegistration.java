package wo.work_optimization.core.domain.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "task_registration")
public class TaskRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

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
}
