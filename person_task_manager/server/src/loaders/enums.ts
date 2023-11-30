export enum DatabaseType {
    MYSQL = "mysql",
    MONGODB = "mongodb",
}

export enum Permission {
    readTask = "READ_TASK_SERVICE",
    writeTask = "WRITE_TASK_SERVICE",
}

export enum Priority {
    low = "LOW",
    medium = "MEDIUM",
    high = "HIGH",
    star = "STAR",
    custom = "CUSTOM",
}

export enum Status {
    todo = "TODO",
    inProgress = "IN_PROGRESS",
    done = "DONE",
    pending = "PENDING",
    archiced = "ARCHIVED",
}