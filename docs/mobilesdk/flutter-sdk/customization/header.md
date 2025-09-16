---
id: headers
title: Header Customization
sidebar_position: 1
---

# 🎨 Header Customization

You can fully customize the chat header (`AppBar`) of `LennaChat` to match your app's branding — including the title, avatar, background color, back button, and even background image.

To get started, here’s how to use each property:

---

## 🧱 1. Set `title`

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  title: "My Chatbot",
)
```

## 🖼️ 2. Set `avatarProfile`

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  avatarProfile: "assets/my_avatar.png",
)
```

## 🎨 3. Set `headerColor`

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  headerColor: Color(0xFF0030C2),
)
```

## 🌄 4. Set `backgroundHeaderImage (optional)`

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  backgroundHeaderImage: AssetImage("assets/header_bg.png"),
)

```

## 🔙 5. Set `Toggle Back Button`

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  showBackButton: true,
)

```

## 🡐 6. Set `Customize Back Button Icon `

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  iconBackButton: Icons.arrow_back_ios,
)

```

## 🎨 7. Set `Change Back Button Color`

The `title` is the main text shown beside the avatar in the header.

```dart title="Example"
LennaChat(
  backColor: Colors.white,
)

```
