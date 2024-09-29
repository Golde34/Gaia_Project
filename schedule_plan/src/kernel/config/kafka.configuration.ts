import { Consumer, Kafka, Producer } from "kafkajs"
import * as dotenv from "dotenv"

dotenv.config({ path: "./src/.env" })

interface KafkaConfig {
    kafkaBrokers: string[];
    clientId: string;
    groupId: string;
}

export const config: KafkaConfig = {
    kafkaBrokers: process.env.KAFKA_BROKERS?.split(",") ?? [],
    clientId: process.env.KAFKA_CLIENT_ID ?? "",
    groupId: process.env.KAFKA_GROUP_ID ?? ""
}
