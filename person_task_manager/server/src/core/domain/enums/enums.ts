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
    archived = "ARCHIVED",
}

export enum ActiveStatus {
    active = "ACTIVE",
    inactive = "INACTIVE",
}

export enum ServiceAcronym {
    AS = "authentication_service",
    GC = "gaia_connector",
    CLG = "client_gui",
    ML = "middleware_loader",
    SP = "schedule_plan",
    WO = "work_optimization",
    GAIA = "GAIA",
    CMC = "camera_cv",
}
