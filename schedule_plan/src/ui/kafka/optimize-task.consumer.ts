import { KafkaCommand } from "../../core/domain/enums/kafka.enum";

export const optimizeTasksHandler = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.OPTIMIZE_SCHEDULE_TASK:
            console.log('Optimize Schedule Task');
            break;
        default:
            console.warn("No handler for command: ", cmd)
    }
}