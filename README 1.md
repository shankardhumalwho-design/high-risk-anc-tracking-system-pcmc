# High Risk ANC Tracking System - PCMC (Expo Android)

## 1. Configure Apps Script URL

Open `api/api.js` and set:

`API_URL = 'https://script.google.com/macros/s/XXXX/exec'`

## 2. Add the Apps Script API bridge

The existing business functions in `code.gs` can stay. Add the bridge shown in `AppsScript_API_Bridge.gs` to the same Apps Script project.

## 3. Install compatible Expo packages

Run `npx expo install expo-secure-store expo-location expo-print expo-sharing expo-file-system`
and `npm install base64-js`.

## 4. Run

`npx expo start`

Use a real Android device for GPS testing.
