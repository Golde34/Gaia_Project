import { KafkaCommand } from "../../core/domain/enums/kafka.enum";
import { schedulePlanUsecase } from "../../core/usecase/schedule-plan.usecase";
import { scheduleTaskUsecase } from "../../core/usecase/schedule-task.usecase";

export const handlerCreateTaskMessage = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.TM_CREATE_TASK:
            scheduleTaskUsecase.createScheduleTaskByKafka(kafkaMessage.data);
            break;
        case KafkaCommand.GAIA_CREATE_TASK:
            scheduleTaskUsecase.createScheduleTaskByKafka(kafkaMessage.data);
            break;
        case KafkaCommand.REGISTER_SCHEDULE_PLAN:
            schedulePlanUsecase.registerSchedulePlan(kafkaMessage.data);
        default:
            console.warn("No handler for command: ", cmd);
    }
}