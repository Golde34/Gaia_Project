import { BadgeDeltaType, ColorConstants, TaskPriority, TaskStatus } from "../constants/constants"

export const statusColor = (status) => {
    if (status === TaskStatus.TODO) {
        return BadgeDeltaType.MODERATE_DECREASE
    } else if (status === TaskStatus.IN_PROGRESS) {
        return BadgeDeltaType.UNCHANGED
    } else if (status === TaskStatus.DONE) {
        return BadgeDeltaType.INCREASE
    } else if (status === TaskStatus.PENDING) {
        return BadgeDeltaType.DECREASE
    }
}

export const priorityColor = (priority) => {
    if (priority === TaskPriority.LOW) {
        return ColorConstants.GREEN 
    } else if (priority === TaskPriority.MEDIUM) {
        return ColorConstants.BLUE 
    } else if (priority === TaskPriority.HIGH) {
        return ColorConstants.RED 
    } else if (priority === TaskPriority.STAR) {
        return ColorConstants.YELLOW 
    }
} 

export const pushPriority = (isHighPriority, isMediumPriority, isLowPriority, isStarPriority) => {
    let priority = []
    if (isHighPriority) {
        priority.push(TaskPriority.HIGH)
    }
    if (isMediumPriority) {
        priority.push(TaskPriority.MEDIUM)
    }
    if (isLowPriority) {
        priority.push(TaskPriority.LOW)
    }
    if (isStarPriority) {
        priority.push(TaskPriority.STAR)
    }
    return priority
}

export const pullPriority = (priorities) => {
    let isHighPriority = false
    let isMediumPriority = false
    let isLowPriority = false
    let isStarPriority = false
    if (priorities === undefined || priorities === null) {
        return [isHighPriority, isMediumPriority, isLowPriority, isStarPriority]
    }
    for (let priority of priorities) {
        if (priority === TaskPriority.HIGH) {
            isHighPriority = true
        } else if (priority === TaskPriority.MEDIUM) {
            isMediumPriority = true
        } else if (priority === TaskPriority.LOW) {
            isLowPriority = true
        } else if (priority === TaskPriority.STAR) {
            isStarPriority = true
        }
    }
    return [isHighPriority, isMediumPriority, isLowPriority, isStarPriority]
}
