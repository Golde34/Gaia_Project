import { KafkaCommand } from "../../core/domain/enums/kafka.enum";
import { scheduleTaskUsecase } from "../../core/usecase/schedule-task.usecase";

export const handlerMessage = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.CREATE_TASK:
            scheduleTaskUsecase.createScheduleTask(kafkaMessage.data);        
            break;
        default:
            console.warn("No handler for command: ", cmd);
    }
}