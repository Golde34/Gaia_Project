export enum KafkaTopic {
    OPTIMIZE_TASK = 'task-manager.optimize-task.topic',
    CREATE_TASK = 'task-manager.create-task.topic',UPLOAD_FILE = 'task-manager.upload-note-file.topic'
}

export enum KafkaCommand {
    CREATE_TASK = 'taskManagerCreateTask',
    UPLOAD_FILE = 'uploadFile',
    UPLOAD_UPDATED_FILE = 'uploadUpdatedFile',
}

export class KafkaMessage {
    constructor(
        public cmd: KafkaCommand,
        public errorCode: string,
        public errorMessage: string,
        public displayTime: string,
        public data: any
    ){}
}