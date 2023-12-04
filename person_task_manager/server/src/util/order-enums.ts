import { Priority, Status } from "../loaders/enums";
import { ITaskEntity } from "../modules/person_task_manager/entities/task.entity";

// export const orderPriorityNumber(task: ITaskEntity): number => {
//     // const priorityOrder = priorityDefo();
//     // const priority = task.priority;
//     return 0;
// }
export const orderPriorityNumber = (priority: string): number => {
    const priorityOrder = priorityDefo();
    switch (priority) {
        case Priority.star:
            return priorityOrder[0].order;
        case Priority.high:
            return priorityOrder[1].order;
        case Priority.medium:
            return priorityOrder[2].order;
        case Priority.low:
            return priorityOrder[3].order;
        case Priority.custom:
            return priorityOrder[4].order;
        default:
            return 2;
    }
}

const priorityDefo = () => {
    const priority = [Priority.star, Priority.high, Priority.medium, Priority.low, Priority.custom];
    const priorityOrder = [];
    for (let i = 0; i < priority.length; i++) {
        priorityOrder.push({ priority: priority[i], order: i });
    }
    // return dictionary: Star: 0, High: 1, Medium: 2, Low: 3, Custom: 4 
    return priorityOrder;
}

const orderStatus = () => {
    const status = [Status.done, Status.inProgress, Status.todo, Status.pending, Status.archived];
    const statusOrder = [];
    for (let i = 0; i < status.length; i++) {
        statusOrder.push({ status: status[i], order: i });
    }
    return statusOrder;
}