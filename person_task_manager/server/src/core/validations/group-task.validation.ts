import { GroupTaskEntity } from "../../infrastructure/database/model-repository/group-task.entity";
import { ProjectEntity } from "../../infrastructure/database/model-repository/project.entity";

export const groupTaskValidation = {
    async checkExistedGroupTaskById(groupTaskId: string): Promise<boolean> {
        try {
            const existedGroupTask = await GroupTaskEntity.findOne({ _id: groupTaskId }) != null
            return existedGroupTask
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedGroupTaskByTitle(title: string): Promise<boolean> {
        try {
            const existedGroupTask = await GroupTaskEntity.findOne({ title: title }) != null
            return existedGroupTask
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedGroupTaskInProject(groupTaskId: string, projectId: string): Promise<boolean> {
        const project = await ProjectEntity.findOne({ _id: projectId, groupTasks: groupTaskId });
        try {
            return (project != null || project != undefined);
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    }
}