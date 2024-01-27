import 'package:flutter/material.dart';
import 'package:mobile_app/components/bottom_nav_bar.dart';
import 'package:mobile_app/configs/const.dart';
import 'package:mobile_app/pages/auth_page.dart';
import 'package:mobile_app/pages/setting_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  // navigate bottom bar
  int _selectedIndex = 0;
  void navigateBottomBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  // pages
  final List<Widget> _pages =[
    HomePage(),
    AuthPage(),
    SettingPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      bottomNavigationBar: GaiaBottomNavBar(
        onTabChange: (index) => navigateBottomBar(index!),
      ),
      // appBar: AppBar(
      //   title: Text('Home Page'),
      //   elevation: 0,
      // ),
      body: _pages[_selectedIndex],
    );
  }
}