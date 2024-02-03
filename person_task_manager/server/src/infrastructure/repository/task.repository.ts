import { UpdateWriteOpResult } from "mongoose";
import { ITaskEntity, TaskEntity } from "../../core/domain/entities/task.entity";
import { DeleteResult } from "mongodb";
import { ActiveStatus, Priority, Status } from "../../core/domain/enums/enums";

class TaskRepository {
    constructor() { }

    async createTask(task: any): Promise<ITaskEntity> {
        return await TaskEntity.create(task);
    }

    async updateTask(taskId: string, task: any): Promise<UpdateWriteOpResult> {
        return await TaskEntity.updateOne({ _id: taskId }, task);
    }

    async deleteTask(taskId: string): Promise<DeleteResult> {
        return await TaskEntity.deleteOne({ _id: taskId });
    }

    async findOneTask(taskId: string): Promise<ITaskEntity | null> {
        return await TaskEntity.findOne({ _id: taskId });
    }

    async findTaskWithSubTasks(taskId: string): Promise<ITaskEntity | null> {
        return await TaskEntity
            .findOne({ _id: taskId, activeStatus: ActiveStatus.active })
            .populate('subTasks');
    }

    async findTaskWithComments(taskId: string): Promise<ITaskEntity | null> {
        return await TaskEntity
            .findOne({ _id: taskId, activeStatus: ActiveStatus.active })
            .populate('comments');
    }

    async findAllTasks(): Promise<ITaskEntity[]> {
        return await TaskEntity.find();
    }

    async pullSubTasksInTask(subTaskId: string): Promise<UpdateWriteOpResult> {
        return await TaskEntity.updateMany({ subTasks: subTaskId }, { $pull: { subTasks: subTaskId } });
    }

    async pullCommentsInTask(commentId: string): Promise<UpdateWriteOpResult> {
        return await TaskEntity.updateMany({ comments: commentId }, { $pull: { comments: commentId } });
    }

    async findOneActiveTask(taskId: string): Promise<ITaskEntity | null> {
        return await TaskEntity.findOne({ _id: taskId, activeStatus: ActiveStatus.active });
    }

    async findOneInactiveTask(taskId: string): Promise<ITaskEntity | null> {
        return await TaskEntity.findOne({ _id: taskId, activeStatus: ActiveStatus.inactive });
    }

    async archieveTask(taskId: string): Promise<UpdateWriteOpResult> {
        return await TaskEntity
            .updateOne({ _id: taskId }, 
                { activeStatus: ActiveStatus.inactive },
                { status: Status.archived});
    }

    async enableTask(taskId: string): Promise<UpdateWriteOpResult> {
        return await TaskEntity
            .updateOne({ _id: taskId }, { activeStatus: ActiveStatus.active });
    }

    // business logic - get top tasks which has the highest rank base on prority, status and activeStatus
    async getTopTasks(limit: number): Promise<ITaskEntity[] | null> {
        return await TaskEntity.find({ 
            priority: Priority.star,
            status: { $in: ['TODO', 'IN_PROGRESS', 'CUSTOM'] },
            activeStatus: ActiveStatus.active
        }).limit(limit);
    }
}

export const taskRepository = new TaskRepository();