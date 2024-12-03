import { KafkaCommand } from "../../core/domain/enums/kafka.enum";
import { scheduleTaskService } from "../../core/services/schedule-task.service";
import { scheduleTaskUsecase } from "../../core/usecase/schedule-task.usecase";

export const optimizeTasksHandler = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.OPTIMIZE_SCHEDULE_TASK:
            scheduleTaskUsecase.optimizeScheduleTask(kafkaMessage.data);
            // scheduleTaskService.optimizeScheduleTask(kafkaMessage.data);
            break;
        default:
            console.warn("No handler for command: ", cmd)
    }
}