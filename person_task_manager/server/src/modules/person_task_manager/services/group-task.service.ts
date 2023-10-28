import { IResponse } from "../../../common/response";
import { msg200, msg400 } from "../../../common/response_helpers";
import { GroupTaskEntity } from "../entities/group-task.entity";
import { groupTaskValidation } from "../validations/group-task.validation";
import { projectService } from "./project.service";

const projectServiceImpl = projectService;
const groupTaskValidationImpl = groupTaskValidation;

class GroupTaskService {
    constructor() {}

    async createGroupTaskToProject(groupTask: any, projectId: string): Promise<IResponse> {
        const createGroupTask = await GroupTaskEntity.create(groupTask);
        const groupTaskId = (createGroupTask as any)._id;
        if (await !groupTaskValidationImpl.checkExistedGroupTaskInProject(groupTaskId, projectId)) {
            projectServiceImpl.updateProject(projectId, { $push: { groupTasks: groupTaskId } });
        }
        
        return msg200({
            message: (createGroupTask as any)
        });
    }

    async updateGroupTask(groupTaskId: string, groupTask: any): Promise<IResponse> {
        try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId)) {
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
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId)) {
                const deleteGroupTask = await GroupTaskEntity.deleteOne({ _id: groupTaskId });
                if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId)) {
                    projectServiceImpl.updateManyProjects({ data: { groupTasks: groupTaskId } }, 
                        { $pull: { groupTasks: groupTaskId } });
                }
                
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

    async updateManyGroupTasks(filter: any, update: any): Promise<IResponse> {
        const updateManyGroupTasks = await GroupTaskEntity.updateMany({filter}, update);
        
        return msg200({
            message: (updateManyGroupTasks as any)
        });
    }

    // disable groupTask
    
    // enable groupTask

    // archive groupTask
}

export const groupTaskService = new GroupTaskService();