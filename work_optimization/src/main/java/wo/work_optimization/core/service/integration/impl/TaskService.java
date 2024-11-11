package wo.work_optimization.core.service.integration.impl;

import kafka.lib.java.adapter.producer.KafkaPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.domain.dto.request.OptimizeTaskRequestDTO;
import wo.work_optimization.core.domain.dto.response.OriginalTaskResponseDTO;
import wo.work_optimization.core.domain.entity.Task;
import wo.work_optimization.core.domain.kafka.SchedulePlanSyncronizedMessage;
import wo.work_optimization.core.domain.kafka.base.KafkaBaseDto;
import wo.work_optimization.core.port.mapper.TaskMapper;
import wo.work_optimization.core.port.store.TaskStore;
import wo.work_optimization.infrastructure.client.adapter.TaskManagerServiceAdapter;
import wo.work_optimization.kernel.utils.DataUtils;

import java.text.ParseException;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaskService {

    private final TaskStore taskStore;
    private final TaskManagerServiceAdapter taskManagerServiceAdapter;
    private final TaskMapper taskMapper;

    // private final SchedulePlanClient schedulePlanClient;
    private final KafkaPublisher kafkaPublisher;

    public Task getTaskByOriginalId(String originalTaskId) throws ParseException {
        try {
            Task task = taskStore.findTaskByOriginalId(originalTaskId);
            if (DataUtils.isNullOrEmpty(task)) {
                // Call Task Manager service to get task by original id
                OriginalTaskResponseDTO originalTaskResponseDTO = taskManagerServiceAdapter.getOriginalTask(originalTaskId);
                return taskMapper.toEntity(originalTaskResponseDTO);
            }
            return task;
        } catch (Exception e) {
            log.error("Error when get task by original id: {}", e.getMessage());
            return null;
        }
    }

    public void sendKafkaToSyncWithSchedulePlan(Task task, String errorCode, String errorMessage) {
        log.info("Task before send kafka to sync with schedule plan: {}", task);
        SchedulePlanSyncronizedMessage data;
        if (DataUtils.isNullOrEmpty(task)) {
            data = SchedulePlanSyncronizedMessage.builder().taskSynchronizeStatus(Constants.ErrorStatus.FAIL).build();
        } else {
            data = SchedulePlanSyncronizedMessage.builder()
                    .taskSynchronizeStatus(Constants.ErrorStatus.SUCCESS)
                    .scheduleTaskId(task.getScheduleTaskId())
                    .taskId(task.getOriginalId())
                    .workOptimTaskId(task.getId())
                    .build();
        }
        KafkaBaseDto<SchedulePlanSyncronizedMessage> message = data.toKafkaBaseSto(errorCode, errorMessage);
        kafkaPublisher.pushAsync(message, TopicConstants.CreateScheduleTaskCommand.SYNC_TOPIC, "wo", null);
        log.info("Sent kafka to sync with schedule plan");
    }

    public Task getTask(OptimizeTaskRequestDTO request) {
        log.info("Get task by taskId: {}, optimTaskId: {}, scheduleTaskId: {}", request.getTaskId(), request.getWorkOptimTaskId(), request.getScheduleTaskId());
        return taskStore.checkSyncTask(request.getTaskId(), request.getScheduleTaskId(), request.getWorkOptimTaskId());
    }
}
