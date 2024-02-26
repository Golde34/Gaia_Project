import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class GaiaBottomNavBar extends StatelessWidget {
  final void Function(int?) onTabChange;
  const GaiaBottomNavBar({super.key, required this.onTabChange,});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: GNav(
          onTabChange: (value) => onTabChange(value),
          color: Colors.grey[400],
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          activeColor: const Color.fromARGB(255, 20, 33, 117),
          tabBackgroundColor: Colors.indigo.shade300,
          tabBorderRadius: 24,
          tabActiveBorder: Border.all(color: Colors.black26),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          tabs: const [
            GButton(
              icon: Icons.task_sharp,
              text: 'Project',
              
            ),
            // GButton(
            //   icon: Icons.shield_sharp,
            //   text: 'Auth',
            // ),
            GButton(
              icon: Icons.text_snippet_sharp,
              text: 'Text',
            ),
            GButton(
              icon: Icons.settings_sharp,
              text: 'Setting',
            ),
          ]),
    );
  }
}
