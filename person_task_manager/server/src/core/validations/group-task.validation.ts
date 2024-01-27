import { GroupTaskEntity } from "../domain/entities/group-task.entity"
import { ProjectEntity } from "../domain/entities/project.entity";

export const groupTaskValidation = {
    async checkExistedGroupTaskById(groupTaskId: string): Promise<boolean> {
        try {
            if (await GroupTaskEntity.findOne({ _id: groupTaskId }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedGroupTaskByTitle(title: string): Promise<boolean> {
        try {
            if (await GroupTaskEntity.findOne({ title: title }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedGroupTaskInProject(groupTaskId: string, projectId: string): Promise<boolean> {
        const project = await ProjectEntity.findOne({ _id: projectId, groupTasks: groupTaskId });
        try {
            return true ? (project != null || project != undefined) : false;
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    }
}