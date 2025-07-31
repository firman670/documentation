---
sidebar_position: 2
title: Installation
description: "Tutorial Installation"
---

# Installation

To get started with `lenna_chat`, simply install the package and integrate the widget into your Flutter app.

---

## 🧩 1. Add Dependency

Add the following to your `pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  lenna_chat: ^0.0.1
```

## 🧩 2. Implementation to your code

```screen title="<Your Screen Name>.dart"
import 'package:flutter/material.dart';
import 'package:lenna_chat/lenna_chat.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LennaChat(
        title: "Lenna AI",
        apiKey: "Your SecretKey",
        projectId: "Your Project Id",
        appId: "Your AppId",
        user: "Data Response Login User" ?? {},
      ),
    );
  }
}

```
