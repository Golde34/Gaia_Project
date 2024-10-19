import { INoteEntity } from "../../domain/entities/note.entity";
import { ActiveStatus } from "../../domain/enums/enums";

export const createNoteMapper = (note: INoteEntity, ownerId: number) => {
    note.name === null ? note.name = convertNewDateToName() : note.name;
    note.isLock === null ? note.isLock = false : note.isLock;
    note.activeStatus === null ? note.activeStatus = ActiveStatus.active : note.activeStatus;
    note.createdAt = new Date();
    note.updatedAt = new Date();
    note.ownerId = ownerId;
    return note;
}

const convertNewDateToName = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}