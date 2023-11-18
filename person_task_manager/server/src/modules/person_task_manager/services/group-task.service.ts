import { IResponse } from "../../../common/response";
import { msg200, msg400 } from "../../../common/response_helpers";
import { GroupTaskEntity } from "../entities/group-task.entity";
import { ProjectEntity } from "../entities/project.entity";
import { TaskEntity } from "../entities/task.entity";
import { groupTaskValidation } from "../validations/group-task.validation";
import { projectService } from "./project.service";

const projectServiceImpl = projectService;
const groupTaskValidationImpl = groupTaskValidation;

class GroupTaskService {
    constructor() { }

    async createGroupTaskToProject(groupTask: any, projectId: string): Promise<IResponse> {
        try {
            const createGroupTask = await GroupTaskEntity.create(groupTask);
            const groupTaskId = (createGroupTask as any)._id;

            if (await groupTaskValidationImpl.checkExistedGroupTaskInProject(groupTaskId, projectId) === false) { // not exist
                projectServiceImpl.updateProject(projectId, { $push: { groupTasks: groupTaskId } });

                return msg200({
                    message: (createGroupTask as any)
                });
            } else {
                const deletedInitGroupTask = await GroupTaskEntity.deleteOne({ _id: groupTaskId });
                return msg400('Group task is not created successfully');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async createGroupTaskFromTask(groupTask: any, projectId: string): Promise<string> {
        try {
            const createGroupTask = await GroupTaskEntity.create(groupTask);
            const groupTaskId = (createGroupTask as any)._id;

            if (await groupTaskValidationImpl.checkExistedGroupTaskInProject(groupTaskId, projectId) === false) { // not exist
                projectServiceImpl.updateProject(projectId, { $push: { groupTasks: groupTaskId } });

                return groupTaskId;
            } else {
                return "undefined";
            }
        } catch (error: any) { 
            console.log(error.message.toString());
            return "undefined";
        }
    }

    async updateGroupTask(groupTaskId: string, groupTask: any): Promise<IResponse> {
        try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId) === true) {

                const updateGroupTask = await GroupTaskEntity.updateOne({ _id: groupTaskId }, groupTask);

                return msg200({
                    message: (updateGroupTask as any)
                });
            } else {
                return msg400('Group task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteGroupTask(groupTaskId: string): Promise<IResponse> {
        try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId) === true) {
                const deleteGroupTask = await GroupTaskEntity.deleteOne({ _id: groupTaskId });
                await projectServiceImpl.updateManyProjects(groupTaskId);

                return msg200({
                    message: (deleteGroupTask as any)
                });
            } else {
                return msg400('Group task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getGroupTask(groupTaskId: string): Promise<IResponse> {
        const groupTask = await GroupTaskEntity.findOne({ _id: groupTaskId });

        return msg200({
            groupTask
        });
    }

    async getTasksInGroupTask(groupTaskId: string): Promise<IResponse> {
        const getTasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks');

        return msg200({
            message: (getTasks as any)
        });
    }

    async updateManyTasksInGroupTask(taskId: string): Promise<IResponse> {
        const updateManyGroupTasks = await GroupTaskEntity.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

        return msg200({
            message: (updateManyGroupTasks as any)
        });
    }

    async updateGroupTaskName(groupTaskId: string, name: string): Promise<IResponse> {
        try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId) === true) {
                const groupTask = await GroupTaskEntity.findOne({ _id: groupTaskId });
                if (groupTask === null) {
                    return msg400('Group task not found');
                } else {
                    groupTask.title = name;
                    await groupTask.save();
                    return msg200({
                        message: 'Group task name updated successfully'
                    });
                }
            }
            return msg400('Group task not found');
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    // calculate totalTasks, totalTasksCompleted
    async calculateTotalTasks(groupTaskId: string): Promise<IResponse> {
        try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId) === true) {
                const groupTask = await GroupTaskEntity.findOne({ _id: groupTaskId });
                if (groupTask === null) {
                    return msg400('Group task not found');
                } else {
                    const totalTasks = groupTask.tasks.length;
                    let totalTasksCompleted = 0;
                    for (let i = 0; i < groupTask.tasks.length; i++) {
                        const taskId = groupTask.tasks[i];
                        const task = await TaskEntity.findOne({ _id: taskId });
                        if (task !== null) {
                            if (task.status === 'DONE') {
                                totalTasksCompleted++;
                            }
                        } else {
                            continue;
                        } 
                    }
                    groupTask.totalTasks = totalTasks;
                    groupTask.totalTasksCompleted = totalTasksCompleted;
                    await groupTask.save();
                    return msg200({
                        message: 'Total tasks in group task calculated successfully'
                    });
                }
            }
            return msg400('Group task not found');
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async updateOrdinalNumber(projectId:string, groupTaskId: string): Promise<IResponse> {
       try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId) === true) {
                const project = await ProjectEntity.findOne({ _id: projectId });
                if (project === null) {
                    return msg400('Project not found');
                } else {
                    const groupTasks = project.groupTasks;
                    const groupTaskIndex = groupTasks.indexOf(groupTaskId);
                    if (groupTaskIndex > -1) {
                        // Remove the group task from its current position
                        groupTasks.splice(groupTaskIndex, 1);
                        // Move the group task to the beginning of the array
                        groupTasks.unshift(groupTaskId);
                    }
                    projectServiceImpl.updateOrdinalNumber(projectId, groupTasks);
                    return msg200({
                        message: 'Ordinal number in group task updated successfully'
                    });
                }
            } else {
                return msg400('Group task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        } 
    }

    // disable groupTask

    // enable groupTask

    // archive groupTask
}

export const groupTaskService = new GroupTaskService();