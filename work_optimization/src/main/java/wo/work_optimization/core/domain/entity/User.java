package wo.work_optimization.core.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private Double maxWorkTime;
    private double constant1;
    private double constant2;
    private double constant3;
}
