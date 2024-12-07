import { ISchedulePlanEntity } from "../../infrastructure/entities/schedule-plan.entity";
import { IScheduleTaskEntity } from "../../infrastructure/entities/schedule-task.entity";
import { createMessage } from "../../infrastructure/kafka/create-message";
import { KafkaHandler } from "../../infrastructure/kafka/kafka-handler";
import { scheduleTaskRepository } from "../../infrastructure/repository/schedule-task.repository";
import { convertErrorCodeToBoolean } from "../../kernel/utils/convert-fields";
import { IResponse, msg200, msg400, msg500 } from "../common/response";
import { ErrorStatus } from "../domain/enums/enums";
import { KafkaCommand, KafkaTopic } from "../domain/enums/kafka.enum";
import { SyncScheduleTaskRequest } from "../domain/request/task.dto";
import { scheduleTaskMapper } from "../mapper/schedule-task.mapper";

class ScheduleTaskService {
    kafkaHandler: KafkaHandler = new KafkaHandler();
    constructor() { }

    async createScheduleTask(scheduleTask: any): Promise<IResponse> {
        try {
            const createScheduleTask = await scheduleTaskRepository.createScheduleTask(scheduleTask);
            return msg200({
                message: (createScheduleTask as any)
            });
        } catch (error: any) {
            return msg500(error.message.toString());
        }
    }

    async updateScheduleTask(scheduleTaskId: string, scheduleTask: any): Promise<IResponse> {
        try {
            const updateScheduleTask = await scheduleTaskRepository.updateScheduleTask(scheduleTaskId, scheduleTask);
            return msg200({
                message: (updateScheduleTask as any)
            });
        } catch (error: any) {
            return msg500(error.message.toString());
        }
    }

    async deleteScheduleTask(scheduleTaskId: string): Promise<IResponse> {
        try {
            const deleteScheduleTask = await scheduleTaskRepository.deleteScheduleTask(scheduleTaskId);
            return msg200({
                message: (deleteScheduleTask as any)
            });
        } catch (error: any) {
            return msg500(error.message.toString());
        }
    }

    async findScheduleTaskById(scheduleTaskId: string): Promise<IResponse> {
        try {
            const scheduleTask = await scheduleTaskRepository.findScheduleTaskById(scheduleTaskId);
            return msg200({
                scheduleTask: scheduleTask
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async pushKafkaCreateScheduleTaskMessage(taskId: string, scheduleTaskId: string, scheduleTaskName: string): Promise<void> {
        const data = scheduleTaskMapper.buildKafkaCreateTaskMapper(taskId, scheduleTaskId, scheduleTaskName);
        const messages = [{
            value: JSON.stringify(createMessage(
                KafkaCommand.CREATE_SCHEDULE_TASK, '00', 'Successful', data
            ))
        }]
        console.log("Push Kafka Message: ", messages);
        this.kafkaHandler.produce(KafkaTopic.CREATE_SCHEDULE_TASK, messages);
    }

    async syncScheduleTask(schedulePlanSyncMessage: SyncScheduleTaskRequest): Promise<boolean> {
        if (schedulePlanSyncMessage.taskSynchronizeStatus !== ErrorStatus.SUCCESS) return false;

        const scheduleTask = await scheduleTaskRepository.findByScheduleTaskIdAndTaskId(
            schedulePlanSyncMessage.scheduleTaskId,
            schedulePlanSyncMessage.taskId
        );

        console.log('Schedule task before synchronized: ', scheduleTask)
        if (scheduleTask) {
            await scheduleTaskRepository.syncScheduleTask(
                schedulePlanSyncMessage.scheduleTaskId,
                convertErrorCodeToBoolean(schedulePlanSyncMessage.taskSynchronizeStatus)
            );
            return true;
        }

        return false;
    }

    async pushKafkaOptimizeTask(schedulePlanSyncMessage: SyncScheduleTaskRequest, isSyncScheduleTask: boolean): Promise<void> {
        const data = scheduleTaskMapper.buildOptimizeTaskMapper(schedulePlanSyncMessage, isSyncScheduleTask);
        const messages = [{
            value: JSON.stringify(createMessage(
                KafkaCommand.OPTIMIZE_CREATING_TASK, '00', 'Successful', data
            ))
        }]
        console.log("Push Kafka Message: ", messages);
        this.kafkaHandler.produce(KafkaTopic.OPTIMIZE_TASK, messages);
    }

    async optimizeScheduleTask(listTasks: any): Promise<string> {
        if (!Array.isArray(listTasks) || listTasks.length === 0) {
            throw new Error("Invalid input: listTasks must be a non-empty array.");
        }

        async function saveToDatabase(task: any): Promise<void> {
            listTasks.forEach(async (scheduleTask: any) => {
                try {
                    const task = await scheduleTaskRepository.findByScheduleTaskIdAndTaskId(scheduleTask.scheduleTaskId, scheduleTask.originalId); 
                    if (task) {
                        const newTask = scheduleTaskMapper.buildOptimizeScheduleTaskMapper(scheduleTask, task); 
                        await scheduleTaskRepository.updateScheduleTask(scheduleTask.scheduleTaskId, newTask);
                    }
                } catch (error) {
                    console.error("Error saving task to database:", error);
                    throw new Error("Failed to save task to the database.");
                }
            })
        }

        try {
            for (const task of listTasks) {
                await saveToDatabase(task);
            }
            console.log("Save database successfully");
            return "SUCCESS";
        } catch (error) {
            console.error("Error saving tasks to database:", error);
            return "FAILED";
        }
    }

    async findScheduleTaskByTaskId(taskId: string): Promise<IScheduleTaskEntity> {
        const scheduleTask = await scheduleTaskRepository.findScheduleTaskByTaskId(taskId);
        if (scheduleTask === null) {
            throw new Error("Task not found");
        }
        return scheduleTask;
    }

    async findTop10NewestTask(schedulePlanId: string): Promise<IScheduleTaskEntity[]> {
        return  await scheduleTaskRepository.findTop10NewestTask(schedulePlanId);
    }

    async findByTaskBatch(schedulePlanId: string, taskBatch: number): Promise<IScheduleTaskEntity[]> {
        return await scheduleTaskRepository.findByTaskBatch(schedulePlanId, taskBatch);
    }
}

export const scheduleTaskService = new ScheduleTaskService();   