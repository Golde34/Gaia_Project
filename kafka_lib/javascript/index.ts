import bodyParser from "body-parser";
import KafkaConfig from "./config";

const jsonParser = bodyParser.json();

const kafkaConfig = new KafkaConfig();

// Consumer
kafkaConfig.consume("test", (value) => {
    console.log("Message consume successfully with value: " + value);
});

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
