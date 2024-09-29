export const convertPriority = (priority: string): number => {
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