import { GroupTaskEntity } from "../entities/group-task.entity"
import { ProjectEntity } from "../entities/project.entity";

export const groupTaskValidation = {
    async checkExistedGroupTaskById(groupTaskId: string): Promise<boolean> {
        if (await GroupTaskEntity.findOne({ _id: groupTaskId }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedGroupTaskByTitle(title: string): Promise<boolean> {
        if (await GroupTaskEntity.findOne({ title: title }) != null) {
            return true; // existed
        }
        return Promise.resolve(false);
    },

    async checkExistedGroupTaskInProject(groupTaskId: string, projectId: string): Promise<boolean> {
        const project = await ProjectEntity.findOne({ _id: projectId, groupTasks: groupTaskId });
        console.log('go here');
        if (project != null || project != undefined) {
            console.log('true');
            return true; // existed
        }
        console.log('false');
        return false;
    }
}