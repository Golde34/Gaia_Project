import * as dotenv from 'dotenv';
import defineConfig from 'vite.config.js'

const REQUIRED_ENV_VARS = [
    'SERVER_HOST',
    'AUTHENTICATION_SERVICE_PORT',
    'GAIA_CONNECTOR_PORT',
    'TASK_MANAGER_PORT',
    'SERVER_TIMEOUT'
];

export const config = {
    serverHost: defineConfig.server.host,
    authenticationServicePort: parseInt( defineConfig.server.authentication_service_port ),
    gaiaConnectorPort: parseInt( defineConfig.server.gaia_connector_port ),
    taskManagerPort: parseInt( defineConfig.server.task_manager_port ),
    serverTimeout: parseInt( defineConfig.server.server_timeout ),
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