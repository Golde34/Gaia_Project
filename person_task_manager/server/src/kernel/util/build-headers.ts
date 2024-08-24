import { config } from "../config/security-configuration";
import { encrypt } from "../../infrastructure/security/encrypt-rsa";

export const buildDefaultHeaders = (headers: Record<string, string>) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers
    };
}

export const buildAuthorizationHeaders = (service: string, userId: number, headers: Record<string, string>) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Service-Token': encrypt(`${service}::${config.privateToken}::${userId}`),
        'Service': service,
        ...headers
    }
}