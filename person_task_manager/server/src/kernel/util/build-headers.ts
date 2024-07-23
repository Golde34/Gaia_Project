import { SERVICE_HEADER, SERVICE_TOKEN_HEADER } from "../../core/domain/constants/constants";
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
        SERVICE_TOKEN_HEADER: encrypt(`${userId}`),
        SERVICE_HEADER: service,
        ...headers
    }
}