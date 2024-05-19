import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env'});

const REQUIRED_ENV_VARS = [
    'LISTEN_PORT',
    'DATABASE_HOST',
    'DATABASE_NAME',
    'DATABASE_PORT',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
];

interface Configuration {
    database: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
    };
    server: {
        listenPort: number;
    };
    kafka: {
        bootstrapServers: string;
        groupId: string;
    };
}

export const config: Configuration = {
    database: {
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: Number(String(process.env.DATABASE_PORT)) ?? 27017,
        name: process.env.DATABASE_NAME ?? 'task_database',
        username: process.env.DATABASE_USERNAME ?? 'root',
        password: process.env.DATABASE_PASSWORD ?? 'root',
    },
    server: {
        listenPort: Number(String(process.env.LISTEN_PORT)) ?? 3002,
    },
    kafka: {
        bootstrapServers: process.env.KAFKA_BOOTSTRAP_SERVERS ?? 'localhost:9094',
        groupId: process.env.KAFKA_GROUP_ID ?? 'task-manager'
    }
};

export const validateEnvironmentVars = (): void => {
    const missingRequirements: string[] = [];
    REQUIRED_ENV_VARS.forEach((envVar) => {
        if (!(envVar in process.env)) {
            missingRequirements.push(envVar);
        }
    });
    if (missingRequirements.length !== 0) {
        throw new Error(`Missing required environment variables: ${missingRequirements.join(', ')}`);
    }
}