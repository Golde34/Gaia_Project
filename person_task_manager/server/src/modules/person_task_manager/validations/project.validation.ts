import { ProjectEntity } from "../entities/project.entity";

export const projectValidation = {
    async checkExistedProjectByProjectId(projectId: string): Promise<boolean> {
        if (await ProjectEntity.findOne({ _id: projectId }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedProjectByProjectName(projectName: string): Promise<boolean> {
        if (await ProjectEntity.findOne({ projectName: projectName }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkOwnerProject(projectId: string, userId: string): Promise<boolean> {
        if (await ProjectEntity.findOne({ _id: projectId, owner: userId }) != null) {
            return true; // owner
        }
        return false;
    },

}