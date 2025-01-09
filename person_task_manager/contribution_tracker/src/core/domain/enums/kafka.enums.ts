export enum KafkaTopic {
    CREATE_COMMIT = 'task-manager.create-commit.topic'
}

export enum KafkaCommand {
    TM_CREATE_COMMIT = 'taskManagerCreateCommit',
    SP_CREATE_COMMIT = 'schedulePlanCreateCommit'
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