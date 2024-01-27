import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class BottomNavBar extends StatelessWidget {
  const BottomNavBar({super.key});

  @override
  Widget build(BuildContext context) {
    return GNav(
      color: Colors.grey[400],
      tabs: [
        GButton(
          icon: Icons.home,
          text: 'Auth',
        ),
        GButton(
          icon: Icons.add_box,
          text: 'Project',
        ),
      ]
    );
  }
}