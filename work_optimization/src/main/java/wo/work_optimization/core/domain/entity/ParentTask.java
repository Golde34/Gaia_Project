package wo.work_optimization.core.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "parent_task")
public class ParentTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String groupTaskId;
    private String groupTaskName;
    private String projectId;
    private String projectName;
    private String schedulePlanId;
    private String schedulePlanName;

    @JsonManagedReference
    @OneToMany(mappedBy = "parentTask", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> task;
}
