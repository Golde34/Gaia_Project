import { IsString } from "class-validator";

export class KafkaCreateTaskMessage {
    @IsString()
    taskId!: string;
    @IsString()
    scheduleTaskId!: string;
    @IsString()
    scheduleTaskName!: string;
}