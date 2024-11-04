import { createMessage } from "../../infrastructure/kafka/create-message";
import { KafkaHandler } from "../../infrastructure/kafka/kafka-handler";
import { scheduleTaskRepository } from "../../infrastructure/repository/schedule-task.repository";
import { IResponse, msg200, msg400, msg500 } from "../common/response";
import { ErrorStatus } from "../domain/enums/enums";
import { KafkaCommand, KafkaTopic } from "../domain/enums/kafka.enum";
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

    async pushKafkaOptimizeTaskMessage(task: any): Promise<void> {
        const message = [{
            value: JSON.stringify(createMessage(
                KafkaCommand.OPTIMIZE_TASK, '00', 'Successful', task
            ))
        }] 
        console.log("Push Kafka Message: ", message);
        this.kafkaHandler.produce(KafkaTopic.CREATE_TASK, message);
    }

    async validateSyncSchedulePlan(schedulePlanSyncMessage: any): Promise<boolean> {
        if (!schedulePlanSyncMessage.taskSynchronizeStatus.equals(ErrorStatus.SUCCESS)) return false;
        const scheduleTask = await scheduleTaskRepository.findByScheduleTaskIdAndTaskId(schedulePlanSyncMessage.scheduleTaskId, schedulePlanSyncMessage.taskId);
        return scheduleTask !== null || scheduleTask !== undefined;
    }  

    async optimizeTask(workOptimTaskId: string) {
        // call to auth service to get user settings
        // from user setting call work optiomization to get the order of display schedule task
        // call to task manager to get the task => Copilot told me so I can delete this idea
        // return the order of display schedule task 
    }
}

export const scheduleTaskService = new ScheduleTaskService();