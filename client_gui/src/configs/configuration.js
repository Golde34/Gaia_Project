const serverHost = import.meta.env.SERVER_HOST ?? 'localhost';
const gaiaConnectorPort = parseInt( import.meta.env.GAIA_CONNECTOR_PORT ?? '5000' );
const authenticationServicePort = parseInt( import.meta.env.AUTHENTICATION_SERVICE_PORT ?? '4001' );
const taskManagerPort = parseInt( import.meta.env.TASK_MANAGER_PORT ?? '3000' );
const middlewarePort = parseInt( import.meta.env.MIDDLEWARE_PORT ?? '4000')
const serverTimeout = parseInt( import.meta.env.SERVER_TIMEOUT ?? '10000' );

const REQUIRED_ENV_VARS = [
    'SERVER_HOST',
    'AUTHENTICATION_SERVICE_PORT',
    'GAIA_CONNECTOR_PORT',
    'TASK_MANAGER_PORT',
    'SERVER_TIMEOUT'
];

export const config = {
    serverHost: serverHost,
    gaiaConnectorPort: gaiaConnectorPort,
    authenticationServicePort: authenticationServicePort,
    taskManagerPort: taskManagerPort,
    middlewarePort: middlewarePort,
    serverTimeout: serverTimeout
};

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