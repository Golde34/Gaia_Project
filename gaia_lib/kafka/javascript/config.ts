import { Consumer, Kafka, Producer } from "kafkajs";

class KafkaConfig {
    consumer: Consumer;
    kafka: Kafka;
    producer: Producer;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'javascript-kafka',
            brokers: ['localhost:9094']
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async produce(topic: string, messages: any[]) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic,
                messages,
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
                    console.log("Message is received with partition: "
                        + partition + " in topic: " + topic);
                    const value = message.value ? message.value.toString() : null;
                    callback(value);
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default KafkaConfig;