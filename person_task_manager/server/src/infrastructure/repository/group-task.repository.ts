import { DeleteResult } from "mongodb";
import { GroupTaskEntity, IGroupTaskEntity } from "../../core/domain/entities/group-task.entity";
import { UpdateWriteOpResult } from "mongoose";
import { ActiveStatus, Status } from "../../core/domain/enums/enums";

class GroupTaskRepository {
    constructor() { }

    async createGroupTask(groupTask: any): Promise<IGroupTaskEntity> {
        return await GroupTaskEntity.create(groupTask);
    }

    async updateOneGroupTask(groupTaskId: string, groupTask: any): Promise<UpdateWriteOpResult> {
        return await GroupTaskEntity.updateOne({ _id: groupTaskId }, groupTask);
    }

    async deleteOneProject(grouptaskId: string): Promise<DeleteResult> {
        return await GroupTaskEntity.deleteOne({ _id: grouptaskId });
    }

    async findOneGroupTaskById(groupTaskId: string): Promise<IGroupTaskEntity | null> {
        return await GroupTaskEntity.findOne({ _id: groupTaskId });
    }

    async findOneGroupTaskWithTasks(grouptaskId: string): Promise<IGroupTaskEntity> {
        return await GroupTaskEntity.findOne({ _id: grouptaskId }).select('tasks');
    }

    async findOneActiveGroupTaskWithTasks(groupTaskId: string): Promise<IGroupTaskEntity> {
        return await GroupTaskEntity
            .findOne({ _id: groupTaskId, activeStatus: ActiveStatus.active })
            .select('tasks');
    }

    async findGroupTasksByTaskId(taskId: string): Promise<IGroupTaskEntity | undefined | null> {
        return await GroupTaskEntity.findOne({ tasks: taskId })
    }

    async findTasksInGrouptaskByTimeStamp(groupTaskId: string, startDate: Date, endDate: Date): Promise<any | null> {
        const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId })
            .populate({
                path: 'tasks',
                match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            })
            .exec();
        return tasks;
    };

    async pullTaskFromGroupTask(taskId: string): Promise<UpdateWriteOpResult> {
        return await GroupTaskEntity.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });
    }

    async findOneActiveGroupTaskById(groupTaskId: string): Promise<IGroupTaskEntity | null> {
        return await GroupTaskEntity
            .findOne({ _id: groupTaskId, activeStatus: ActiveStatus.active });
    }

    async findOneInactiveGroupTaskById(groupTaskId: string): Promise<IGroupTaskEntity | null> {
        return await GroupTaskEntity
            .findOne({ _id: groupTaskId, activeStatus: ActiveStatus.inactive });
    }

    async archiveGroupTask(groupTaskId: string): Promise<UpdateWriteOpResult> {
        return await GroupTaskEntity
            .updateOne({ _id: groupTaskId },
                { activeStatus: ActiveStatus.inactive },
                { status: Status.archived });
    }

    async enableGroupTask(groupTaskId: string): Promise<UpdateWriteOpResult> {
        return await GroupTaskEntity
            .updateOne({ _id: groupTaskId },
                { activeStatus: ActiveStatus.active });
    }

    async pushTaskToGroupTask(groupTaskId: string, taskId: string): Promise<UpdateWriteOpResult> {
        return await GroupTaskEntity
            .updateOne({ _id: groupTaskId }, { $push: { tasks: taskId } });
    }

    async pullTaskFromSpecifiedGroupTask(groupTaskId: string, taskId: string): Promise<UpdateWriteOpResult> {
        return await GroupTaskEntity
            .updateOne({ _id: groupTaskId }, { $pull: { tasks: taskId } });
    }

    async findActiveTasksInActiveGroupTask(groupTaskId: string): Promise<any> {
        return await GroupTaskEntity
            .findOne({ _id: groupTaskId, activeStatus: ActiveStatus.active })
            .populate({
                path: 'tasks',
                match: { activeStatus: ActiveStatus.active }
            });
    }
}

export const groupTaskRepository = new GroupTaskRepository();