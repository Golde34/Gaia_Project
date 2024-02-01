import { priorityOrder } from "../../../kernel/util/order-enums";
import { GroupTaskEntity } from "../../domain/entities/group-task.entity";
import { ITaskEntity, TaskEntity } from "../../domain/entities/task.entity";
import { ActiveStatus } from "../../domain/enums/enums";

class TaskServiceUtils {
    constructor() { }

    async getTaskBySubTaskId(subTaskId: string): Promise<string> {
        // pass
        return '';
    }

    async getTaskByCommentId(commentId: string): Promise<string> {
        // pass
        return '';
    }

    async getTaskByStatus(groupTaskId: string, status: string): Promise<ITaskEntity[]> {
        try {
            const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId, activeStatus: ActiveStatus.active })
                .populate({
                    path: 'tasks',
                    match: { activeStatus: ActiveStatus.active }
                });

            const tasksByStatus: ITaskEntity[] = [];
            tasks?.tasks.forEach((task: any) => {
                if (typeof task !== 'string' && task.status === status) {
                    tasksByStatus.push(task);
                }
            });

            return tasksByStatus;
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async getOtherTasksByEnteredStatus(groupTaskId: string, status: string): Promise<ITaskEntity[]> {
        try {
            const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId, activeStatus: ActiveStatus.active })
                .populate({
                    path: 'tasks',
                    match: { activeStatus: ActiveStatus.active }
                });

            const tasksByStatus: ITaskEntity[] = [];
            tasks?.tasks.forEach((task: any) => {
                if (typeof task !== 'string' && task.status !== status) {
                    tasksByStatus.push(task);
                }
            });

            return tasksByStatus;
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async orderByPriority(tasks: ITaskEntity[]): Promise<ITaskEntity[]> {
        let taskArray = [] as any[];

        tasks.forEach(task => {
            taskArray.push({ taskId: task._id, priority: task.priority });
        })

        //decrease priority dimension, from array to number
        taskArray = priorityOrder.decreasePriorityDimension(taskArray);

        // quick sort task array
        taskArray = priorityOrder.quickSort(taskArray, 0, taskArray.length - 1);
        let orderedTasks = [] as ITaskEntity[];

        const tasksPromises = taskArray.map(async task => {
            let tasks = await TaskEntity.findOne({ _id: task.taskId, activeStatus: ActiveStatus.active })
            orderedTasks.push(tasks!);
        });
        await Promise.all(tasksPromises);

        return orderedTasks;
    }

    revertTaskOrder(tasks: ITaskEntity[]): ITaskEntity[] {
        let taskArray = [] as any[];

        for (let i = tasks.length - 1; i >= 0; i--) {
            taskArray.push(tasks[i]);
        }
        return taskArray;
    }
}

export const taskServiceUtils = new TaskServiceUtils();