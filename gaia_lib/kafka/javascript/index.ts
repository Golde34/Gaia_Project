import KafkaConfig from "./config";
import { kafkaController } from "./kafka-controller";

const kafkaConfig = new KafkaConfig();

kafkaController(kafkaHandler); 

// Consumer
// kafkaConfig.consume("test", (value) => {
//     console.log("Message consume successfully with value: " + value);
// });

// Producer
const sendMessageToKafka = (message: string) => {
    try {
        const messages = [{ value: message }];
        kafkaConfig.produce("test", messages);
    } catch (error) {
        console.error(error);
    }
}

sendMessageToKafka("Hello KafkaJS user!");
