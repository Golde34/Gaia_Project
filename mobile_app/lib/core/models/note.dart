import 'dart:convert';

class Note {
  String? id;
  String title;
  String? content;
  String? password;
  bool? isPinned;
  DateTime createdAt;
  DateTime? updatedAt;

  Note({
    this.id,
    required this.title,
    this.content,
    this.password,
    this.isPinned,
    required this.createdAt,
    this.updatedAt,
  });

  Note copyWith({
    String? id,
    String? title,
    String? content,
    String? password,
    bool? isPinned,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Note(
      id: id ?? this.id,
      title: title ?? this.title,
      content: content ?? this.content,
      password: password ?? this.password,
      isPinned: isPinned ?? this.isPinned,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'password': password,
      'pinned': isPinned,
      'creationDate': createdAt.millisecondsSinceEpoch,
      'lastEditDate': updatedAt?.millisecondsSinceEpoch,
    };
  }

  factory Note.fromMap(Map<String, dynamic> map) {
    return Note(
      id: map['id'],
      title: map['title'],
      content: map['content'],
      password: map['password'],
      isPinned: map['isPinned'],
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt']),
      updatedAt: DateTime.fromMillisecondsSinceEpoch(map['updatedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Note.fromJson(String source) => Note.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Note(id: $id, title: $title, content: $content, password: $password, pinned: $isPinned, creationDate: $createdAt, lastEditDate: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Note &&
        other.id == id &&
        other.title == title &&
        other.content == content &&
        other.password == password &&
        other.isPinned == isPinned &&
        other.createdAt == createdAt &&
        other.updatedAt == updatedAt;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        title.hashCode ^
        content.hashCode ^
        password.hashCode ^
        isPinned.hashCode ^
        createdAt.hashCode ^
        updatedAt.hashCode;
  }
}