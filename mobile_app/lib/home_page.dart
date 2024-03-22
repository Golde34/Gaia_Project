import 'package:flutter/material.dart';
import 'package:mobile_app/ui/components/bottom_nav_bar.dart';
import 'package:mobile_app/core/configs/const.dart';
// import 'package:mobile_app/pages/auth_page.dart';
import 'package:mobile_app/ui/pages/project_page.dart';
import 'package:mobile_app/ui/pages/setting_page.dart';
import 'package:mobile_app/ui/pages/note_page/note_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  // navigate bottom bar
  int _selectedIndex = 0;
  void navigateBotBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
    print('index: $index');
    print('selectedIndex: $_selectedIndex');
  }

  // pages
  final List<Widget> _pages = <Widget>[
    const ProjectPage(),
    const NotePage(),
    const SettingPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      bottomNavigationBar: GaiaBottomNavBar(
        onTabChange: (value) => navigateBotBar(value!),
        // console.log('value: $value'),
        
      ),
      // appBar: AppBar(
      //   title: Text('Home Page'),
      //   elevation: 0,
      // ),
      body: _pages[_selectedIndex],
    );
  }
}