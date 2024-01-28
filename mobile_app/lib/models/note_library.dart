import 'package:mobile_app/models/note.dart';

class NoteLibrary {
  final List<Note> texts;

  NoteLibrary({required this.texts});

  List<Note> get getTexts => texts;
  void addText(Note text) => texts.add(text);
  void removeText(Note text) => texts.remove(text);
  void updateText(Note text) {
    final int index = texts.indexWhere((element) => element.id == text.id);
    texts[index] = text;
  }
  
}