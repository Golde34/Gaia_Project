import { IResponse, msg400 } from "../common/response";
import { OptimizeScheduleTaskMessage, SyncScheduleTaskRequest } from "../domain/request/task.dto";
import { scheduleTaskMapper } from "../mapper/schedule-task.mapper";
import { schedulePlanService } from "../services/schedule-plan.service";
import { scheduleTaskService } from "../services/schedule-task.service";

class ScheduleTaskUsecase {
    constructor() { }

    async createScheduleTaskByKafka(scheduleTask: any): Promise<void> {
        try {
            const task = scheduleTaskMapper.kafkaCreateTaskMapper(scheduleTask);
            const result = await scheduleTaskService.createScheduleTask(task);
            console.log('Result: ', result);

            const scheduleTaskId = result.data.message.id;
            const scheduleTaskName = result.data.message.title;
            scheduleTaskService.pushKafkaCreateScheduleTaskMessage(task.taskId, scheduleTaskId, scheduleTaskName);
            // scheduleTaskService.pushKafkaOptimizeTaskMessage(result.data.message)
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

    async syncScheduleTask(schedulePlanSyncMessage: SyncScheduleTaskRequest): Promise<void> {
        try {
            const scheduleTaskValidation = await scheduleTaskService.syncScheduleTask(schedulePlanSyncMessage)
            console.log('Schedule task is synchronized!: ', scheduleTaskValidation);
            if (!scheduleTaskValidation) {
                console.log('Push this error to logging tracker, i dont know what is goin on if we cant sync schedule task yet.')
                // Push to logging tracker to handle error case
            } 
            scheduleTaskService.pushKafkaOptimizeTask(schedulePlanSyncMessage, scheduleTaskValidation);
        } catch (error) {
            console.error("Error on syncScheduleTask: ", error);
        } 
    }

    async optimizeScheduleTask(schedulePlanOptimizeMessage: OptimizeScheduleTaskMessage): Promise<void> {
        try {
            const validateUser = await schedulePlanService.findSchedulePlanByUserId(schedulePlanOptimizeMessage.userId);
            if (!validateUser) {
                console.log('Push this error to logging tracker, user validate fail need to check the whole account.')
            }
            const optimizedTask = await scheduleTaskService.optimizeScheduleTask(schedulePlanOptimizeMessage.tasks)
        } catch (error) {
            console.error("Error on optimizeScheduleTask: ", error);
        }
    }
}

export const scheduleTaskUsecase = new ScheduleTaskUsecase();