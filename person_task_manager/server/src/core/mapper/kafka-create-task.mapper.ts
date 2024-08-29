import { ITaskEntity } from "../../infrastructure/database/entities/task.entity";
import { EMPTY_SENTENCE } from "../domain/constants/constants";
import { IsString } from "class-validator";

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
}

export const kafkaCreateTaskMapper = async (data: ITaskEntity, projectName: string | undefined, groupTaskName: string | undefined): Promise<KafkaCreateTaskMessage> => {
    const message = new KafkaCreateTaskMessage();
    message.task = data;
    message.taskId = data._id;
    message.project = projectName === undefined ? null : projectName;
    message.groupTask = groupTaskName === undefined ? null : groupTaskName;
    return message;
};