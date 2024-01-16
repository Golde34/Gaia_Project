import 'package:flutter/material.dart';

class ChuChu extends StatelessWidget {
  const ChuChu({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const CircleAvatar(
        backgroundImage: AssetImage('assets/images/chuchu.png'),
      ),
      title: const Text('ChuChu'),
      subtitle: const Text('ChuChu is a cute little mouse.'),
      trailing: IconButton(
        icon: const Icon(Icons.favorite_border),
        onPressed: () {},
      ),
    );
  }
}