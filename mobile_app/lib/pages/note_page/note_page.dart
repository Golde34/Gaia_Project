import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/note.dart';
import 'package:mobile_app/models/note_library.dart';
import 'package:mobile_app/pages/note_page/editing_note_page.dart';
import 'package:provider/provider.dart';

class NotePage extends StatefulWidget {
  const NotePage({Key? key}) : super(key: key);

  @override
  State<NotePage> createState() => _NotePageState();
}

class _NotePageState extends State<NotePage> {

  void createNewNote() {
    int id = Provider.of<NoteLibrary>(context, listen: false).getAllNotes().length;
    String noteId = '$id';
    Note newNote = Note(
      id: noteId,
      title: '',
      createdAt: DateTime.now(),
    );

    goToEditingNotePage(newNote, true);
  }

  void goToEditingNotePage(Note note, bool isNewNote) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => EditingNotePage(
          note: note,
          isNewNote: false,
        ), 
      ),
    );
  }

  void deleteNote(Note note) {
    Provider.of<NoteLibrary>(context, listen: false).deleteNoteById(note.id!);
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<NoteLibrary>(
      builder: (context, value, child) => Scaffold(
        backgroundColor: Colors.indigo.shade50,
        floatingActionButton: FloatingActionButton(
          onPressed: createNewNote,
          elevation: 0,
          backgroundColor: Colors.grey[300],
          child: const Icon(
            Icons.add,
            color: Colors.white,
          ),
        ),
        body: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
                const Padding(
                  padding: EdgeInsets.only(left: 25, top: 25),
									child: Text(
										'Note Page',
										style: TextStyle(
												fontSize: 32, fontWeight: FontWeight.bold),
									),
								),
								CupertinoListSection.insetGrouped(
									backgroundColor: Colors.indigo.shade50,
									children: List.generate(
										value.getAllNotes().length,
										(index) => CupertinoListTile(
											title: Text(value.getAllNotes()[index].title),
										),
									),
								),
							],
				),
      ),
		);
  }
}
