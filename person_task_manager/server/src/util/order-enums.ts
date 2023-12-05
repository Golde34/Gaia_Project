import { Priority, Status } from "../loaders/enums";
import { ITaskEntity, TaskEntity } from "../modules/person_task_manager/entities/task.entity";

export const orderByPriority = async (tasks: ITaskEntity[]): Promise<ITaskEntity[]> => {
    let taskArray = [] as any[];

    tasks.forEach(task => {
        taskArray.push({ taskId: task._id, priority: task.priority });
    })
 
    //decrease priority dimension, from array to number
    taskArray = decreasePriorityDimension(taskArray);

    // quick sort task array
    taskArray = quickSort(taskArray, 0, taskArray.length - 1);
    console.log("taskArray: ", taskArray);
    let orderedTasks = [] as ITaskEntity[];

    const tasksPromises = taskArray.map(async task => {
        let tasks = await TaskEntity.findOne({ _id: task.taskId })
        orderedTasks.push(tasks!);
    });
    await Promise.all(tasksPromises);

    return orderedTasks;
}
const decreasePriorityDimension = (taskArray: any[]): any => {
    let priorityDict = priorityDefo();
    taskArray.forEach(task => {
        let min = 10;
        for (let i = 0; i < task.priority.length; i++) {
            let number = priorityDict.find((item: any) => item.priority === task.priority[i])!.order;
            if (number < min) {
                min = number;
            }
        }
        task.number = min;
    });
    return taskArray;
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
const quickSort = (taskArray: any[], left: number, right: number): any[] => {
    let index;
    if (taskArray.length > 1) {
        index = partition(taskArray, left, right);
        if (left < index - 1) {
            quickSort(taskArray, left, index - 1);
        }
        if (index < right) {
            quickSort(taskArray, index, right);
        }
    }
    return taskArray;
}
const partition = (taskArray: any[], left: number, right: number): number => {
    let pivot = taskArray[Math.floor((right + left) / 2)].number;
    let i = left;
    let j = right;
    while (i <= j) {
        while (taskArray[i].number < pivot) {
            i++;
        }
        while (taskArray[j].number > pivot) {
            j--;
        }
        if (i <= j) {
            swap(taskArray, i, j);
            i++;
            j--;
        }
    }
    return i;
}
const swap = (taskArray: any[], leftIndex: number, rightIndex: number): void => {
    let temp = taskArray[leftIndex];
    taskArray[leftIndex] = taskArray[rightIndex];
    taskArray[rightIndex] = temp;
}