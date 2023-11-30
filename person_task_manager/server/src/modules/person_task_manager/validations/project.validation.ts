import { ProjectEntity } from "../entities/project.entity";

export const projectValidation = {
    async checkExistedProjectById(projectId: string): Promise<boolean> {
        try {
            if(await ProjectEntity.findOne({ _id: projectId }) != null) {
                return true;
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedProjectByName(projectName: string): Promise<boolean> {
        try {
            if (await ProjectEntity.findOne({ projectName: projectName }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkOwnerProject(projectId: string, userId: string): Promise<boolean> {
        try {
            if (await ProjectEntity.findOne({ _id: projectId, owner: userId }) != null) {
                return true; // owner
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    }
}