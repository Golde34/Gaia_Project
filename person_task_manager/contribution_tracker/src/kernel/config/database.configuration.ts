import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env' })

const REQUIRED_ENV_DB_VARS = [
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
}

export const config: Configuration = {
    database: {
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: Number(String(process.env.DATABASE_PORT)) ?? 27017,
        name: process.env.DATABASE_NAME ?? 'task_database',
        username: process.env.DATABASE_USERNAME ?? 'root',
        password: process.env.DATABASE_PASSWORD ?? 'root',
    },
};

export const validateEnvironmentVars = (): void => {
    const missingRequirements: string[] = [];
    REQUIRED_ENV_DB_VARS.forEach((envVar) => {
        if (!(envVar in process.env)) {
            missingRequirements.push(envVar);
        }
    });
    if (missingRequirements.length !== 0) {
        throw new Error(`Missing required environment variables: ${missingRequirements.join(', ')}`);
    }
}