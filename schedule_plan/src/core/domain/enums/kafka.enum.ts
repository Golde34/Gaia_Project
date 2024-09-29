export enum KafkaTopic {
    CREATE_TASK = "task-manager.create-task.topic",
    CREATE_SCHEDULE_TASK = "schedule-plan.create-schedule-task.topic"
}

export enum KafkaCommand {
    CREATE_TASK = "taskManagerCreateTask",
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