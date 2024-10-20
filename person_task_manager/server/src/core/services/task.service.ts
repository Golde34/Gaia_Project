import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { UpdateTaskInDialogDTO } from "../domain/dtos/task.dto";
import { taskValidation } from "../validations/task.validation";
import { groupTaskService } from "./group-task.service";
import { projectService } from "./project.service";
import { groupTaskServiceUtils } from "./service_utils/group-task.service-utils";
import { taskServiceUtils } from "./service_utils/task.service-utils";
import { CREATE_TASK_FAILED, TASK_NOT_FOUND, UPDATE_TASK_FAILED } from "../domain/constants/error.constant";
import { taskStore } from "../port/store/task.store";
import { groupTaskStore } from "../port/store/group-task.store";
import { KafkaConfig } from "../../infrastructure/kafka/kafka-config";
import { KafkaCommand, KafkaTopic } from "../domain/enums/kafka.enums";
import { createMessage } from "../../infrastructure/kafka/create-message";
import { InternalCacheConstants, NOT_EXISTED } from "../domain/constants/constants";
import { userTagStore } from "../port/store/user-tag.store";
import { kafkaCreateTaskMapper, KafkaCreateTaskMessage } from "../port/mapper/kafka-create-task.mapper";
import { projectStore } from "../port/store/project.store";
import CacheSingleton from "../../infrastructure/internal-cache/cache-singleton";
import { ITaskEntity } from "../domain/entities/task.entity";
import { IGroupTaskEntity } from "../domain/entities/group-task.entity";

class TaskService {
    constructor(
        public kafkaConfig = new KafkaConfig(),
        public taskValidationImpl = taskValidation,
        public taskCache = CacheSingleton.getInstance().getCache()
    ) { }

    async createTaskInGroupTask(task: any): Promise<ITaskEntity> {
        // check existed user tag
        const userTag = await userTagStore.findTagByTagId(task.tag);
        if (userTag === null) {
            console.log("This task is no need to have tag");
        } else {
            task.tag = userTag._id;
        }
        // create new task
        task.createdAt = new Date();
        task.updatedAt = new Date();
        if (task.duration === 0 || task.duration === undefined || task.duration === null) task.duration = 2;
        const createTask = await taskStore.createTask(task);
        this.clearTaskCache(task.groupTaskId);
        return createTask;
    }

    async handleAfterCreateTask(createTask: any, groupTaskId: string): Promise<IResponse> {
        const taskId = (createTask as any)._id;
        if (await this.taskValidationImpl.checkExistedTaskInGroupTask(taskId, groupTaskId) === NOT_EXISTED) {
            // push task id to group task
            await groupTaskStore.pushTaskToGroupTask(groupTaskId, taskId);
            groupTaskServiceUtils.calculateTotalTasks(groupTaskId);

            return msg200({
                message: (createTask as any)
            });
        } else {
            await taskStore.deleteTask(taskId);
            return msg400(CREATE_TASK_FAILED);
        }
    }

    async pushKafkaToCreateTask(task: any, groupTaskId: string): Promise<void> {
        const data = await this.buildCreateTaskMessage(task, groupTaskId);
        this.pushCreateTaskMessage(data);
    }

    async buildCreateTaskMessage(createdTask: ITaskEntity, groupTaskId: string): Promise<KafkaCreateTaskMessage> {
        const projectName = await projectStore.findOneProjectByGroupTaskId(groupTaskId).then((result) => result?.name).catch(null);
        const groupTaskName = await groupTaskStore.findGroupTaskById(groupTaskId).then((result) => result?.title).catch(null);
        const userId = await projectStore.findOneProjectByGroupTaskId(groupTaskId).then((result) => result?.ownerId ?? 0).catch(() => 0);
        return kafkaCreateTaskMapper(createdTask, projectName, groupTaskName, userId);
    }

    pushCreateTaskMessage(data: KafkaCreateTaskMessage): void {
        const messages = [{
            value: JSON.stringify(createMessage(
                KafkaCommand.CREATE_TASK, '00', 'Successful', data
            ))
        }]
        console.log("Push kafka message: ", messages)
        this.kafkaConfig.produce(KafkaTopic.CREATE_TASK, messages);
    }

    clearTaskCache(groupTaskId: string): void {
        this.taskCache.clear(InternalCacheConstants.TASK_TABLE + groupTaskId);
    }

    async updateTask(taskId: string, task: any): Promise<IResponse> {
        try {
            if (await this.taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const updateTask = await taskStore.updateTask(taskId, task);

                return msg200({
                    message: (updateTask as any)
                });
            } else {
                return msg400(TASK_NOT_FOUND);
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteTask(taskId: string, groupTaskId: string): Promise<IResponse> {
        try {
            if (await this.taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                // delete task id in group task
                await groupTaskStore.pullTaskFromSpecifiedGroupTask(groupTaskId, taskId);
                groupTaskServiceUtils.calculateTotalTasks(groupTaskId);

                const deleteTask = await taskStore.deleteTask(taskId);
                return msg200({
                    message: (deleteTask as any)
                });
            } else {
                return msg400(TASK_NOT_FOUND);
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getTask(taskId: string): Promise<IResponse> {
        const task = await taskStore.findTaskById(taskId);
        return msg200({
            task
        });
    }

    async getSubTasksInTask(taskId: string): Promise<IResponse> {
        const getSubTasks = await taskStore.findTaskWithSubTasks(taskId);
        return msg200({
            message: (getSubTasks as any)
        });
    }

    async getCommentsInTask(taskId: string): Promise<IResponse> {
        const getComments = await taskStore.findTaskWithComments(taskId);
        return msg200({
            message: (getComments as any)
        });
    }

    // This fucntion is for boss only
    async getAllTasks(): Promise<IResponse> {
        const tasks = await taskStore.findAllTasks();
        return msg200({
            tasks
        });
    }

    async updateManyCommentsInTask(commentId: string): Promise<IResponse> {
        const updateManyTasks = await taskStore.pullCommentsInTask(commentId);

        return msg200({
            message: (updateManyTasks as any)
        });
    }

    async updateManySubTasksInTask(subTaskId: string): Promise<IResponse> {
        const updateManyTasks = await taskStore.pullSubTasksInTask(subTaskId);
        return msg200({
            message: (updateManyTasks as any)
        });
    }

    async updateTaskInDialog(taskId: string, task: UpdateTaskInDialogDTO): Promise<IResponse> {
        try {
            if (await this.taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const taskUpdate = await taskStore.findTaskById(taskId);

                if (taskUpdate === null) return msg400(TASK_NOT_FOUND);

                taskUpdate.title = task.title;
                taskUpdate.description = task.description ?? ''; // Use optional chaining operator and provide a default value
                taskUpdate.status = task.status;

                const updateTask = await taskStore.updateTask(taskId, taskUpdate);

                return msg200({
                    message: (updateTask as any)
                });
            } else {
                return msg400(UPDATE_TASK_FAILED);
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    // get top task 
    async getTopTasks(limit: number): Promise<IResponse> {
        try {
            const tasks = await taskStore.getTopTasks(limit);
            if (tasks === null) {
                return msg400(TASK_NOT_FOUND);
            } else {
                const topTasks: any[] = [];
                for (let i = 0; i < tasks.length; i++) {
                    const task = tasks[i];
                    const groupTaskId = await groupTaskService.getGroupTaskByTaskId(task._id);
                    const projectId = await projectService.getProjectByGroupTaskId(groupTaskId);

                    topTasks.push({
                        task,
                        groupTaskId,
                        projectId
                    });
                }
                return msg200({ topTasks });
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getTaskDashboard(groupTaskId: string): Promise<IResponse> {
        const taskDashboard = {
            doneTaskList: [] as ITaskEntity[],
            notDoneTaskList: [] as ITaskEntity[],
        };

        const notDoneTasks = await taskServiceUtils.orderByPriority(await taskServiceUtils.getOtherTasksByEnteredStatus(groupTaskId, "DONE"));
        const doneTasks = taskServiceUtils.revertTaskOrder(await taskServiceUtils.getTaskByStatus(groupTaskId, "DONE"));

        taskDashboard.doneTaskList = doneTasks;
        taskDashboard.notDoneTaskList = notDoneTasks;

        return msg200({
            message: taskDashboard as any,
        });
    }

    async moveTask(taskId: string, oldGroupTaskId: string, newGroupTaskId: string): Promise<IResponse> {
        try {
            await groupTaskStore.pullTaskFromSpecifiedGroupTask(oldGroupTaskId, taskId);
            await groupTaskStore.pushTaskToGroupTask(newGroupTaskId, taskId);

            return msg200({
                message: 'Move task successfully'
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async archiveTask(taskId: string): Promise<IResponse | undefined> {
        try {
            if (await this.taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const task = await taskStore.findActiveTaskById(taskId);
                if (task === null) {
                    return msg400(TASK_NOT_FOUND);
                } else {
                    await taskStore.archiveTask(taskId);
                    return msg200({
                        message: 'Archive task successfully'
                    });
                }
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async enableTask(taskId: string): Promise<IResponse | undefined> {
        try {
            if (await this.taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const task = await taskStore.findInactiveTaskById(taskId);
                if (task === null) {
                    return msg400(TASK_NOT_FOUND);
                } else {
                    await taskStore.enableTask(taskId);
                    return msg200({
                        message: 'Enable task successfully'
                    });
                }
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async checkExistedTask(taskId: string, groupTask: IGroupTaskEntity): Promise<boolean> {
        try {
            const taskIds = groupTask.tasks.map(task => task.toString());
            console.log('Task ids: ', taskIds);
            const result = taskIds.includes(taskId);
            console.log('Result: ', result);
            if (result) {
                const task = await taskStore.findTaskById(taskId);
                console.log('Task: ', task);
                if (task === null || task === undefined) {
                    console.log('Task does not exist');
                    return false;
                }
            } else {
                console.log('Group task does not have this task');
                return false;
            }
            return true;
        } catch (error: any) {
            console.log('Error: ', error);
            return false;
        }
    }

    async getTaskTable(groupTaskId: string): Promise<IResponse> {
        const taskTableCache = this.taskCache.get(InternalCacheConstants.TASK_TABLE + groupTaskId);
        if (taskTableCache) {
            console.log('Get task table from cache');
            return msg200({
                message: taskTableCache as any,
            });
        } else {
            console.log('Get task table from database');
            const taskTable = await groupTaskStore.findActiveTasksInActiveGroupTask(groupTaskId);
            this.taskCache.set(InternalCacheConstants.TASK_TABLE + groupTaskId, taskTable);
            return msg200({
                message: taskTable as any,
            });
        }
    }

    // add subTask

}

export const taskService = new TaskService();