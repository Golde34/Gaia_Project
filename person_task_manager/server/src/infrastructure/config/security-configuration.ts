import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env'});

interface SecurityConfig {
    publicKey: string;
}

export const config: SecurityConfig = {
    publicKey: process.env.SECURITY_PUBLIC_KEY ?? ''
}
