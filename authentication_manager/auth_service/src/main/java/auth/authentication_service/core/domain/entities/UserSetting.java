package auth.authentication_service.core.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.*;

import java.util.Date;

@Entity
@Data
@Builder
@Table(name = "user_setting")
@AllArgsConstructor
@NoArgsConstructor
public class UserSetting {

	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "optimized_task_config", columnDefinition = "INT(11) COMMENT '1: First in Last out, 2: Optimize all tasks, \n"
			+
			"3: Calculate time and optimize, 4: Register tasks by day'")
	private Integer optimizedTaskConfig;

	@Column(name = "private_profile_config", columnDefinition = "TINYINT(4) COMMENT '1: Private, 2: Public'")
	private Integer privateProfileConfig;

	@Column(name = "task_sorting_algorithm", columnDefinition = "INT(11) COMMENT '1: Priority, 2: Time, \n" +
			"3: Time and Priority, 4: Tabu Search'")
	private Integer taskSortingAlgorithm;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	@JsonIgnore
	private User user;

	private Date createdDate;
	private Date updatedDate;

}