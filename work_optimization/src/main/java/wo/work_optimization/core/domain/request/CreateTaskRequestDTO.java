package wo.work_optimization.core.domain.request;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequestDTO {
    private String title;
    private String description;
    private String[] priority;
    private String status;
    private String startDate;
    private String deadline;
    private int duration;
    private String createdAt;
    private String updatedAt;
    private String activeStatus;
    private String id;
}