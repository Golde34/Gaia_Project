import { INoteEntity } from "../../../core/domain/entities/note.entity";
import { NoteEntity } from "../model-repository/note.entity";

class NoteRpository {
    constructor() { }

    async createNote(note: any): Promise<INoteEntity> {
        return await NoteEntity.create(note);
    }


}

export const noteRepository = new NoteRpository();