interface KafkaConfig {
    kafkaBrokers: string[];
    clientId: string;
    groupId: string;
}

export const config: KafkaConfig = {
    kafkaBrokers: ['localhost:9094'], 
    clientId: 'typescript-kafka',
    groupId: 'typescript-kafka' 
}

