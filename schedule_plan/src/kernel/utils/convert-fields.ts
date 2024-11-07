import { ErrorStatus } from "../../core/domain/enums/enums";

export const convertPriority = (priorities: string[]): number => {
    const priority = priorities[0];
    switch (priority) {
        case "Low":
            return 1;
        case "Medium":
            return 2;
        case "High":
            return 3;
        case "Star":
            return 5;
        default:
            return 0;
    }
}

export const convertErrorCodeToBoolean = (error: string): boolean => {
    switch (error) {
        case ErrorStatus.SUCCESS:
            return true;
        case ErrorStatus.FAIL:
            return false;
        case ErrorStatus.TIMEOUT:
            return false; 
        default:
            console.log('Error code not found: ', error);
            return false;
    }
}