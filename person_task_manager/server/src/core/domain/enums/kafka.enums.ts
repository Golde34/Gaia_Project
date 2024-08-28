export enum KafkaTopic {
    OPTIMIZE_TASK = 'task-manager.optimize-task.topic',
    CREATE_TASK = 'task-manager.create-task.topic'
}

export enum KafkaCommand {
    CREATE_TASK = 'CREATE_TASK'

}

export class KafkaMessage {
    constructor(
        public command: KafkaCommand,
        public errorCode: string,
        public errorMessage: string,
        public displayTime: string,
        public data: any
    ){}
}