import { INoteEntity, NoteEntity } from "../entities/note.entity";

class NoteRpository {
    constructor() { }

    async createNote(note: any): Promise<INoteEntity> {
        return await NoteEntity.create(note);
    }


}

export const noteRepository = new NoteRpository();