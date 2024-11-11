import { IScheduleTaskEntity, ScheduleTaskEntity } from "../../infrastructure/entities/schedule-task.entity"
import { convertPriority } from "../../kernel/utils/convert-fields";
import { KafkaCreateTaskMessage, KafkaOptimizeTaskMessage, SyncScheduleTaskRequest } from "../domain/request/task.dto";

export const scheduleTaskMapper = {

    kafkaCreateTaskMapper(data: any): IScheduleTaskEntity {
        return new ScheduleTaskEntity({
            taskId: data.task.id,
            title: data.task.title,
            priority: convertPriority(data.task.priority),
            status: data.task.status,
            startDate: data.task.startDate,
            deadline: data.task.deadline,
            duration: data.task.duration,
            activeStatus: data.task.activeStatus,
            preferenceLevel: data.task.preferenceLevel ? data.task.preferenceLevel : 0,
        });
    },

    buildKafkaCreateTaskMapper(userId: number, taskId: string, scheduleTaskId: string, scheduleTaskName: string ) {
        const message = new KafkaCreateTaskMessage()
        message.userId = userId
        message.taskId = taskId
        message.scheduleTaskId = scheduleTaskId
        message.scheduleTaskName = scheduleTaskName
        return message
    },

    buildOptimizeTaskMapper(syncScheduleTaskRequest: SyncScheduleTaskRequest, isSync: boolean): KafkaOptimizeTaskMessage {
        const message = new KafkaOptimizeTaskMessage()
        message.taskId = syncScheduleTaskRequest.taskId
        message.scheduleTaskId = syncScheduleTaskRequest.scheduleTaskId
        message.workOptimTaskid = syncScheduleTaskRequest.workOptimTaskId
        message.isSync = isSync.toString()
        return message
    }
}