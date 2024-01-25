import 'package:flutter/material.dart';
import 'package:mobile_app/components/bottom_nav_bar.dart';
import 'package:mobile_app/configs/const.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      bottomNavigationBar: BottomNavBar(),
      // appBar: AppBar(
      //   title: Text('Home Page'),
      //   elevation: 0,
      // ),
      body: ListView(
        children: [
          // ChuChu(),
        ],
      )
    );
  }
}