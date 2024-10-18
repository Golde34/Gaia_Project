package auth.authentication_service.core.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.*;

import java.util.Date;

@Entity
@Data
@Builder
@Table(name="user_setting")
@AllArgsConstructor
@NoArgsConstructor
public class UserSetting {

    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @Column(name = "optimized_task_config",
            columnDefinition = "INT(11) COMMENT '1: Auto optimize, 2: Optimize at creation, \n" + 
                                "3: Optimize at creation and after 4 hours, 4: Disable optimization'")
    private int optimizedTaskConfig;

    @Column(name = "private_profile_config",
            columnDefinition = "TINYINT(4) COMMENT '1: Private, 2: Public'")
    private int privateProfileConfig;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Date createdDate;
    private Date updatedDate;
}