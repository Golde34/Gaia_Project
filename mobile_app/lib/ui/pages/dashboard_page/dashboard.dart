import 'package:flutter/material.dart';
import 'package:mobile_app/core/models/note.dart';
import 'package:mobile_app/infrastructure/providers/note_provider.dart';
import 'package:mobile_app/infrastructure/repositories/note_repository.dart';
import 'package:provider/provider.dart';

class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  List<Note>? noteList;

  @override
  void initState() {
    super.initState();
    _getNotes();
  }

  void _getNotes() async {
    // await context.read(noteProvider.notifier).loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
      ),
      body: const Center(
        child: Text('Dashboard Page'),
      ),
    );
  }
}