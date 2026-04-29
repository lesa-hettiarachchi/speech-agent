# STEMM Lab — Speech Synthesis Prototype
**CSE3MAD Assessment 3 | La Trobe University | Lesandu Hetti Arachchige (21533031)**

## What This Feature Does
Reads experiment instruction steps aloud using the device's built-in text-to-speech engine via `expo-speech`. Students can follow along hands-free while conducting physical STEMM experiments.

## Why STEMM Lab Needs It
The User Specifications describe an Activity Instructions Screen where steps are shown one at a time. Students are physically active during experiments hands busy, attention on the task. Audio instructions remove the need to look down and read, reducing cognitive load and supporting students who are early readers, ESL learners, or have dyslexia.

## Tech Stack & Architecture
- **Framework**: Expo / React Native
- **Language**: TypeScript — The project has been fully migrated from JavaScript to TypeScript (`.ts`/`.tsx`) to ensure strict type safety, robust code structure, and easier maintainability.
- **Routing**: Expo Router (App Router)
- **Speech Synthesis**: `expo-speech`

## How To Run
1. Clone this repo: `git clone https://github.com/lesa-hettiarachchi/speech-agent.git`
2. Install dependencies: `npm install`
3. Start the server: `npx expo start`
4. Scan the QR code with the **Expo Go** app on a physical device.
   *(Note: Text-to-Speech relies on hardware APIs and works best on physical devices. Behaviour may vary or fail on iOS/Android simulators.)*

## Ethical Considerations
- All TTS processing is on-device. No text is sent to any external server.
- No microphone access is required or used.
- Language is set to `en-AU` (Australian English) — a production version would offer multilingual support for ESL students.

## Known Limitations
- `Speech.pause()` is an iOS-only feature. On Android, `Speech.stop()` is used as a fallback.
- Word-level highlighting (highlighting words as they are spoken) works natively on iOS. Android currently defaults to full-line highlighting.

## Acknowledgements
- `expo-speech` documentation: https://docs.expo.dev/versions/latest/sdk/speech/
- STEMM Lab User Specification (2026), CSE3MAD, La Trobe University
- WCAG 2.1 accessibility guidelines: https://www.w3.org/WAI/WCAG21/quickref/
