import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env'});

interface SecurityConfig {
    publicKey: string;
    privateToken: string;
}

export const config: SecurityConfig = {
    publicKey: process.env.SECURITY_PUBLIC_KEY ?? '',
    privateToken: process.env.SECURITY_PRIVATE_TOKEN ?? ''
}
