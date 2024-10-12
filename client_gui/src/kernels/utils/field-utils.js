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
