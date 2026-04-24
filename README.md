# STEMM Lab — Speech Synthesis Prototype
**CSE3MAD Assessment 3 | La Trobe University | Lesandu Hetti Arachchige (21533031)**

## What This Feature Does
Reads experiment instruction steps aloud using the device's built-in
text-to-speech engine via expo-speech. Students can follow along
hands-free while conducting physical STEMM experiments.

## Why STEMM Lab Needs It
The User Specification (Screen 7) describes an Activity Instructions Screen
where steps are shown one at a time. Students are physically active during
experiments — hands busy, attention on the task. Audio instructions remove
the need to look down and read, reducing cognitive load and supporting
students who are early readers, ESL learners, or have dyslexia.

## How To Run
1. Clone this repo
2. npm install
3. npx expo start
4. Scan QR with Expo Go on a physical device
   (TTS works on physical devices — behaviour may vary on simulators)

## Package Used
- expo-speech: https://docs.expo.dev/versions/latest/sdk/speech/

## Ethical Considerations
- All TTS processing is on-device. No text is sent to any server.
- No microphone is used.
- Language set to en-AU (Australian English) — production would offer
  multilingual support for ESL students.

## Known Limitation
Speech.pause() is iOS only. On Android, stop is used instead.
Word-level highlighting works on iOS; Android shows full-line highlight.

## Acknowledgements
- expo-speech documentation: https://docs.expo.dev/versions/latest/sdk/speech/
- STEMM Lab User Specification (2026), CSE3MAD, La Trobe University
- WCAG 2.1 accessibility guidelines: https://www.w3.org/WAI/WCAG21/quickref/
