export enum KafkaTopic {
    CREATE_TASK = "task-manager.create-task.topic",
    CREATE_SCHEDULE_TASK = "schedule-plan.create-schedule-task.topic"
}

export enum KafkaCommand {
    TM_CREATE_TASK = "taskManagerCreateTask",
    GAIA_CREATE_TASK = "gaiaCreateTask",
    CREATE_SCHEDULE_TASK = "schedulePlanCreateTask"
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