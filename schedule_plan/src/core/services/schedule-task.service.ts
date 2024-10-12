import { createMessage } from "../../infrastructure/kafka/create-message";
import { KafkaHandler } from "../../infrastructure/kafka/kafka-handler";
import { scheduleTaskRepository } from "../../infrastructure/repository/schedule-task.repository";
import { IResponse, msg200, msg400, msg500 } from "../common/response";
import { KafkaCommand, KafkaTopic } from "../domain/enums/kafka.enum";
import { scheduleTaskMapper } from "../mapper/schedule-task.mapper";

class ScheduleTaskService {
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
        const kafkaHandler = new KafkaHandler();
        kafkaHandler.produce(KafkaTopic.CREATE_SCHEDULE_TASK, messages);
    }

    async sendRequestOptimizeTask(scheduleTask: any): Promise<void> {
        // check database if schedule is sync with work optim
        // send request by kafka to calculate and estimate time
        // if not send rest request to update and optimize task

        // const isSync = this.isTaskSynchronized(scheduleTask.scheduleTaskId);
        // if (isSync) {
        //     this.sendRequestByKafka(scheduleTask);
        // } else {
        //     this.sendRequestByRest(scheduleTask);
        // }

    }

    // isTaskSynchronized(scheduleTaskId: string): boolean {
    //     // check database if schedule is sync with work optim
    //     return true;
    // }

    // async sendRequestByKafka(scheduleTask: any): Promise<void> {
    //     const data = scheduleTaskMapper.buildKafkaOptimizeTaskMapper(scheduleTask);
    //     const messages = [{
    //         value: JSON.stringify(createMessage(
    //             KafkaCommand.OPTIMIZE_SCHEDULE_TASK, '00', 'Successful', data
    //         ))
    //     }]
    //     console.log("Push Kafka Message: ", messages);
    //     const kafkaHandler = new KafkaHandler();
    //     kafkaHandler.produce(KafkaTopic.OPTIMIZE_SCHEDULE_TASK, messages);
    // }

    // async sendRequestByRest(scheduleTask: any): Promise<void> {
    //     const data = scheduleTaskMapper.buildKafkaOptimizeTaskMapper(scheduleTask);
    //     const messages = [{
    //         value: JSON.stringify(createMessage(
    //             KafkaCommand.OPTIMIZE_SCHEDULE_TASK, '00', 'Successful', data
    //         ))
    //     }]
    //     console.log("Push Kafka Message: ", messages);
    //     const kafkaHandler = new KafkaHandler();
    //     kafkaHandler.produce(KafkaTopic.OPTIMIZE_SCHEDULE_TASK, messages);
    // }
}

export const scheduleTaskService = new ScheduleTaskService();