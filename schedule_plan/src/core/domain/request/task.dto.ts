import { IsString } from "class-validator";

export class KafkaCreateTaskMessage {
    @IsString()
    taskId!: string;
    @IsString()
    scheduleTaskId!: string;
    @IsString()
    scheduleTaskName!: string;
    userId!: number;
}

export class SyncScheduleTaskRequest {
    taskSynchronizeStatus!: string;
    @IsString()
    scheduleTaskId!: string;
    @IsString()
    taskId!: string;
    @IsString()
    workOptimTaskId!: string;
}

export class KafkaOptimizeTaskMessage {
    @IsString()
    taskId!: string;
    @IsString()
    scheduleTaskId!: string;
    @IsString()
    workOptimTaskid!: string;
    @IsString()
    isSync!: string;
}