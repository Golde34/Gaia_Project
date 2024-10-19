import { EMPTY_SENTENCE } from "../../domain/constants/constants";
import { IsString } from "class-validator";
import { ITaskEntity } from "../../domain/entities/task.entity";

export class KafkaCreateTaskMessage {
    @IsString()
    sentence: string = EMPTY_SENTENCE;
    @IsString()
    project: string | null = null;
    @IsString()
    groupTask: string | null = null;
    task!: ITaskEntity;
    @IsString()
    taskId?: string;
    userId!: number;
}

export const kafkaCreateTaskMapper = async (data: ITaskEntity, projectName: string | undefined, groupTaskName: string | undefined, userId: number)
    : Promise<KafkaCreateTaskMessage> => {
    const message = new KafkaCreateTaskMessage();
    message.task = data;
    message.taskId = data._id;
    message.project = projectName === undefined ? null : projectName;
    message.groupTask = groupTaskName === undefined ? null : groupTaskName;
    message.userId = userId;
    return message;
};