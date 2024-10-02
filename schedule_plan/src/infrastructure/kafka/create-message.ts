import { KafkaCommand, KafkaMessage } from "../../core/domain/enums/kafka.enum";

export function createMessage(command: KafkaCommand, errorCode: string, errorMessage: string, data: any) {
    const displayTime = new Date().toISOString();
    return new KafkaMessage(command, errorCode, errorMessage, displayTime, data);
}