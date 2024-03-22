import { priorityOrder } from "../../../kernel/util/order-enums";
import { ITaskEntity } from "../../domain/entities/task.entity";
import { groupTaskStore } from "../../store/group-task.store";
import { taskStore } from "../../store/task.store";

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
            const tasks = await groupTaskStore.findActiveTasksInActiveGroupTask(groupTaskId);
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
            const tasks = await groupTaskStore.findActiveTasksInActiveGroupTask(groupTaskId);

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
            let tasks = await taskStore.findActiveTaskById(task.taskId);
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