import { KafkaCommand } from "../../core/domain/enums/kafka.enum";
import { scheduleTaskService } from "../../core/services/schedule-task.service";

export const optimizeTasksHandler = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.OPTIMIZE_SCHEDULE_TASK:
            scheduleTaskService.optimizeScheduleTask(kafkaMessage.data.tasks);
            break;
        default:
            console.warn("No handler for command: ", cmd)
    }
}