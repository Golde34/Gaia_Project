import { IResponse, msg400 } from "../common/response";
import { scheduleTaskMapper } from "../mapper/schedule-task.mapper";
import { scheduleTaskService } from "../services/schedule-task.service";

class ScheduleTaskUsecase {
    constructor() { }

    async createScheduleTaskByKafka(scheduleTask: any): Promise<void>{
        try {
            const task = scheduleTaskMapper.kafkaCreateTaskMapper(scheduleTask);
            const result = await scheduleTaskService.createScheduleTask(task);
            console.log('Result: ', result);
            const scheduleTaskId = result.data.message.id;
            scheduleTaskService.pushKafkaCreateScheduleTaskMessage(task.taskId, scheduleTaskId); 
        } catch (error) {
            console.error("Error on createScheduleTask: ", error);
        }
    }

    async createScheduleTaskByRest(scheduleTask: any): Promise<IResponse> {
        try {
            return await scheduleTaskService.createScheduleTask(scheduleTask);
        } catch (error) {
            console.error("Error on createScheduleTask: ", error);
            return msg400("Cannot create schedule task!");
        }
    }
}

export const scheduleTaskUsecase = new ScheduleTaskUsecase();