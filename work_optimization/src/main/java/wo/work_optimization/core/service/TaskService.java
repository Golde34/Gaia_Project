package wo.work_optimization.core.service;

import org.springframework.stereotype.Service;

import kafka.lib.java.adapter.producer.KafkaPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.kafka.SchedulePlanSyncronizedMessage;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;
import wo.work_optimization.core.port.client.SchedulePlanClient;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.kernel.utils.DataUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskService {

    private final TaskStore taskStore;
    private final SchedulePlanClient schedulePlanClient;
    private final KafkaPublisher kafkaPublisher;
    private final DataUtils dataUtils;

    public void sendRestToSyncWithSchedulePlan(String taskId, String scheduleId) {
        boolean isSync = taskStore.checkSyncWithSchedulePlan(taskId, scheduleId) != null;
        if (!isSync) {
            Task task = schedulePlanClient.getSchedulePlanId(taskId);
            if (task != null) {
                taskStore.createTask(task);
            }
        }
    }

    public void sendKafkaToSyncWithSchedulePlan(Task task, String errorCode, String errorMessage) {
        log.info("Task before send kafka to sync with schedule plan: {}", task);
        SchedulePlanSyncronizedMessage data;
        if (dataUtils.isNullOrEmpty(task)) {
            data = SchedulePlanSyncronizedMessage.builder().taskSynchronizeStatus(Constants.ErrorStatus.FAIL).build();
        }
        data = SchedulePlanSyncronizedMessage.builder()
                .taskSynchronizeStatus(Constants.ErrorStatus.SUCCESS)
                .scheduleTaskId(task.getScheduleTaskId())
                .taskId(task.getOriginalId())
                .workOptimTaskId(task.getId())
                .build();

        KafkaBaseDto<SchedulePlanSyncronizedMessage> message = data.toKafkaBaseSto(errorCode, errorMessage);
        kafkaPublisher.pushAsync(message, TopicConstants.CreateScheduleTaskCommand.SYNC_TOPIC, "wo", null);
        log.info("Sent kafka to sync with schedule plan");
    }
}
