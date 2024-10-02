import { IScheduleTaskEntity, ScheduleTaskEntity } from "../../infrastructure/entities/schedule-task.entity"
import { convertPriority } from "../../kernel/utils/convert-priority";
import { KafkaCreateTaskMessage } from "../domain/request/task.dto";

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

    buildKafkaCreateTaskMapper(taskId: string, scheduleTaskId: string) {
        const message = new KafkaCreateTaskMessage()
        message.taskId = taskId
        message.scheduleTaskId = scheduleTaskId
        return message
    }
}