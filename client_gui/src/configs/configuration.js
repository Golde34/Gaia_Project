import * as dotenv from 'dotenv';

dotenv.config( { path: './src/.env' } );

const REQUIRED_ENV_VARS = [
    'LISTEN_PORT',
    'SERVER_HOST',
    'AUTHENTICATION_SERVICE_PORT',
    'GAIA_CONNECTOR_PORT',
    'TASK_MANAGER_PORT',
];

export const config = {
    listenPort: parseInt( process.env.LISTEN_PORT ),
    serverHost: process.env.SERVER_HOST,
    authenticationServicePort: parseInt( process.env.AUTHENTICATION_SERVICE_PORT ),
    gaiaConnectorPort: parseInt( process.env.GAIA_CONNECTOR_PORT ),
    taskManagerPort: parseInt( process.env.TASK_MANAGER_PORT ),
}

export const validateEnvironmentVars = () => {
    const missingRequirements = [];
    REQUIRED_ENV_VARS.forEach( ( envVar ) => {
        if ( !process.env[envVar] ) {
            missingRequirements.push( envVar );
        }
    });
    if (missingRequirements.length != 0) {
        throw new Error( `Missing environment variables: ${missingRequirements.join(', ')}` );
    }
}