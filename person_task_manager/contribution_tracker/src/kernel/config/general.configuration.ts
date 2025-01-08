import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env' })

const REQUIRED_ENV_VARS = [
    'LISTEN_PORT',
    'GITHUB_DOMAIN',
    'GITHUB_URL'
];

interface Configuration {
    server: {
        listenPort: number;
        githubDomain: string;
        githubUrl: string;
    };
    taskManagerServer: {
        host: string;
        port: number;
    };
    schedulePlanServer: {
        host: string;
        port: number;
    };
}

export const config: Configuration = {
    server: {
        listenPort: Number(String(process.env.LISTEN_PORT)) ?? 3008,
        githubDomain: process.env.GITHUB_DOMAIN ?? null,
        githubUrl: process.env.GITHUB_URL ?? null,
    },
    taskManagerServer: {
        host: process.env.TASK_MANAGER_HOST ?? 'localhost',
        port: process.env.TASK_MANAGER_PORT ?? '3000',
    },
    schedulePlanServer: {
        host: process.env.SCHEDULE_PLAN_HOST ?? 'localhost',
        port: process.env.SCHEDULE_PLAN_PORT ?? '3002',
    }
}

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