import { SyncProjectRepoDto } from "../domain/dtos/github-object.dto";

class ProjectCommitService {
    constructor() { }

    async syncProjectRepo(request: SyncProjectRepoDto): Promise<string> {
        try {
            console.log("Syncing project repo: ", request);
            return "Project repo synced";
        } catch (error) {
            console.error("Error on syncProjectRepo: ", error);
            return "Error on syncProjectRepo";
        }
    }
}

export const projectCommitService = new ProjectCommitService();