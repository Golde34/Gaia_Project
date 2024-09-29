import { KafkaTopic } from "../../core/domain/enums/kafka.enum";
import { handlerMessage } from "../../ui/kafka/create-task.consumer";
import { KafkaHandler } from "./kafka-handler";
import * as dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

export const kafkaController = async (kafkaHandler: KafkaHandler) => {
    const topics = getKafkaTopicsFromEnv();
    if (topics.length === 0) {
        console.log("No topics defined in environment variables");
        return;
    }
    console.log("Topics: ", topics);

    try {
        topics.forEach(topic => {
            kafkaHandler.consume(topic, (message) => {
                const handler = kafkaTopicHandlers[topic];
                if (handler) {
                    handler(message.value.toString());
                } else {
                    console.warn("No handler defined for topic: ", topic);
                    console.log("Message: ", message);
                }
            });
        })
    } catch (error) {
        console.log("There is no topics so we cannot subcribe consumer")
        console.error(error);
    }
}

const getKafkaTopicsFromEnv = (): string[] => {
    const topicVars = Object.keys(process.env).filter(key => key.startsWith("KAFKA_TOPICS."));
    const topics = topicVars.map(key => process.env[key] as string);
    return topics.filter(Boolean);
}

const kafkaTopicHandlers: Record<string, (message: string) => void> = {
    [KafkaTopic.CREATE_TASK]: (message: string) => handlerMessage(message),
}
