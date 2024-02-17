import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/core/models/note.dart';
import 'package:mobile_app/infrastructure/repositories/note_repository.dart';

final noteProvider = StateNotifierProvider<NoteRepository, List<Note>>((ref) {
  return NoteRepository();
});
