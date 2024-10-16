import { KafkaCommand } from "../../core/domain/enums/kafka.enum";

export const handlerSyncTaskMessage = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.SYNC_SCHEDULE_TASK:
            console.log("OK")
            break;
        default:
            console.warn("No handler for command: ", cmd);
    }
}