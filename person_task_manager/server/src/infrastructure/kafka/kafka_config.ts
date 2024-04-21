import { Consumer, Producer, Kafka } from 'kafkajs';
import { config } from '../config/configuration';

export class KafkaConfig {
    consumer: Consumer;
    producer: Producer;
    kafka: Kafka;

    constructor() {
        this.kafka = new Kafka({
            clientId: config.kafka.groupId,
            brokers: getArrayBrokers(config.kafka.bootstrapServers)
        })
        this.consumer = this.kafka.consumer({ groupId: config.kafka.groupId });
        this.producer = this.kafka.producer();
    }

    async produce(topic: string, messages: any[]) {
        try {
            await this.producer.send({
                topic,
                messages
            });
        } catch (error) {
            console.error(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic: string, callback: (message: any) => void) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log("Message received with partition: " + partition
                    + " and topic: " + topic
                    + " and value: " + message.value.toString());
                    const value = message.value ? message.value.toString() : null;
                    callback(message);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}

function getArrayBrokers(bootstrapServers: string): string[] {
    return bootstrapServers.split(',');
}