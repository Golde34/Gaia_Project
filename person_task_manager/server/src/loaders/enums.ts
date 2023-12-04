export enum DatabaseType {
    MYSQL = "mysql",
    MONGODB = "mongodb",
}

export enum Permission {
    readTask = "READ_TASK_SERVICE",
    writeTask = "WRITE_TASK_SERVICE",
}

export enum Priority {
    star = "Star",
    high = "High",
    medium = "Medium",
    low = "Low",
    custom = "Custom",
}

export enum Status {
    todo = "TODO",
    inProgress = "IN_PROGRESS",
    done = "DONE",
    pending = "PENDING",
    archiced = "ARCHIVED",
}