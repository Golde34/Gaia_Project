import * as dotenv from 'dotenv';

dotenv.config( { path: './src/.env' } );

const REQUIRED_ENV_VARS = [
    'LISTEN_PORT',
    'SERVER_HOST',
    'AUTHENTICATION_SERVICE_PORT',
    'GAIA_CONNECTOR_PORT',
    'TASK_MANAGER_PORT',