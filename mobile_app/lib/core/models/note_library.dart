import 'package:flutter/material.dart';
import 'package:mobile_app/core/models/note.dart';

class NoteLibrary extends ChangeNotifier {
  List<Note> allNotes = [
    Note(
      id: '1',
      title: 'Note 1',
      content: 'Content 1',
      isPinned: false,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    ),
    Note(
      id: '2',
      title: 'Note 2',
      content: 'Content 2',
      isPinned: false,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    ),
    Note(
      id: '3',
      title: 'Note 3',
      content: 'Content 3',
      isPinned: false,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    ),
  ];
  
  List<Note> getAllNotes() {
    return allNotes;
  }

  void addNewNote(Note note) {
    allNotes.add(note);
    notifyListeners();
  }

  void updateNote(Note note, String content) {
    for (int i=0; i<allNotes.length; i++) {
      if (allNotes[i].id == note.id) {
        allNotes[i].content = content;
        allNotes[i].updatedAt = DateTime.now();
      }
    }
    notifyListeners();
  }

  void deleteNoteById(String id) {
    allNotes.removeWhere((note) => note.id == id);
    notifyListeners();
  }
}