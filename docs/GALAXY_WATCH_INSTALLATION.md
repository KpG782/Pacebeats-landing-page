# Galaxy Watch Installation Guide

This guide explains how to install and connect the Pacebeats Wear OS companion app.

## Downloads

- Wear OS companion APK:
  - https://github.com/KpG782/pacebeats-release-files/releases/latest/download/wear-release.apk
- Wear APK SHA-256:
  - https://github.com/KpG782/pacebeats-release-files/releases/latest/download/wear-release.apk.sha256
- Mobile APK:
  - https://github.com/KpG782/pacebeats-release-files/releases/latest/download/mobile-release.apk

## Prerequisites

- Android phone with Pacebeats mobile app installed
- Galaxy Watch (Wear OS)
- Android Platform Tools (`adb`) installed on your computer
- Phone and watch connected to the same Wi-Fi network

## 1. Enable Debugging on the Watch

1. On the watch, open **Settings > About watch > Software information**.
2. Tap **Software version** several times to enable Developer options.
3. Open **Settings > Developer options**.
4. Enable **ADB debugging**.
5. Enable **Wireless debugging** and note the watch IP and port (for example `192.168.1.50:5555`).

## 2. Connect to the Watch with ADB

```bash
adb connect WATCH_IP:PORT
```

Example:

```bash
adb connect 192.168.1.50:5555
```

Verify the connection:

```bash
adb devices
```

## 3. Install the Wear Companion APK

If the APK is in your current folder:

```bash
adb -s WATCH_IP:PORT install -r wear-release.apk
```

If you use the full local path:

```bash
adb -s WATCH_IP:PORT install -r C:\path\to\wear-release.apk
```

## 4. Pair with the Mobile App

1. Open Pacebeats on your phone.
2. Open Pacebeats Companion on your watch.
3. Keep Bluetooth and network permissions enabled.
4. Complete the in-app pairing flow and confirm the watch appears as connected.

## Troubleshooting

- `device offline`:
  - Run `adb disconnect` then reconnect.
- Not listed in `adb devices`:
  - Recheck watch IP/port and Wi-Fi.
- Install blocked:
  - Make sure the APK fully downloaded and retry with `-r`.
- Pairing fails:
  - Keep both apps open and grant all requested permissions.
