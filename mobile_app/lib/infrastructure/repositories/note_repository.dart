import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/core/models/note.dart';

class NoteRepository extends StateNotifier<List<Note>> {
  NoteRepository() : super([]);

  Future<void> addNote(Note note) async {
    state = [...state, note];
    await _saveData();
  }

  Future<void> updateNoteById(String id, String content) async {
    state = state.map((note) {
      if (note.id == id) {
        return note.copyWith(content: content, updatedAt: DateTime.now());
      }
      return note;
    }).toList();
    await _saveData();
  }

  Future<void> deleteNoteById(String id) async {
    state = state.where((note) => note.id != id).toList();
    await _saveData();
  }

  Future<void> _saveData() async {
    var box = Hive.box('gaia_mobile_app');

    List<String> savedNoteList = state.map((note) => json.encode(note.toMap())).toList();
    await box.put('notes', savedNoteList);
  }

  void sortList() {
    state = [...state..sort((a, b) => b.updatedAt!.compareTo(a.updatedAt!))];
  }

  /// Creates custom string for dateTime elements.
  static String dateTimeString(DateTime dt) {
    var dtInLocal = dt.toLocal();
    var now = DateTime.now().toLocal();
    var dateString = "Saved ";

    var diff = now.difference(dtInLocal);

    if (now.day == dtInLocal.day) {
      // Creates format like: 12:35 PM,
      var todayFormat = DateFormat("h:mm a");
      dateString += todayFormat.format(dtInLocal);
    } else if ((diff.inDays) == 1 || (diff.inSeconds < 86400 && now.day != dtInLocal.day)) {
      dateString += "Yesterday";
    } else {
      var monthYearFormat = DateFormat("M/d/y");
      dateString += monthYearFormat.format(dtInLocal);
    }
    return dateString;
  }
}
