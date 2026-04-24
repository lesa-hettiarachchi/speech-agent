# AGENT.md — STEMM Lab: Speech Synthesis Prototype
> You are Claude Code. Read this entire file before writing a single line of code.
> This is your complete build specification. Do not improvise beyond what is written here.
> If something is unclear, re-read this file before asking.

---

## 🎯 Project Identity

| Field | Value |
|---|---|
| **Assessment** | CSE3MAD Assessment 3 — Mobile Feature Prototype |
| **University** | La Trobe University |
| **Student** | Lesandu Hetti Arachchige — 21533031 |
| **Feature** | Speech Synthesis — read experiment instructions aloud using `expo-speech` |
| **App** | STEMM Lab — A Real-World STEMM Games App for Years 5–9 students |

---

## 🧠 What You Are Building

A self-contained React Native / Expo prototype that demonstrates **text-to-speech
for experiment instructions** in STEMM Lab.

The prototype is NOT the full STEMM Lab app. It is a focused proof-of-concept
with just enough screens to demonstrate the feature working in context.

### The problem it solves

STEMM Lab's Activity Instructions Screen shows numbered steps one at a time.
Students follow these steps while physically doing experiments — hands busy
building parachutes, fanning paper, placing phones on structures.

Having to look down and read the next step interrupts the activity. For primary
school students (Years 5–6), some are early readers, ESL students, or have
dyslexia. Read-aloud instructions solve a real accessibility problem that
exists directly in the User Specification.

### The User Specification evidence

From the STEMM Lab User Specification (2026), Screen 7 — Activity Instructions Screen:
> "Each step is displayed one at a time with Next and Back navigation buttons,
> minimising cognitive load and keeping students focused on the current action."

Speech synthesis extends this design intent — students stay focused on the
physical activity, not on reading the screen.

Curriculum code this supports: accessibility aligns with WCAG 2.1 AA,
which the Assessment 1 Design Report explicitly commits to.

### Why this qualifies as a new feature for assessment

The lab program covers:
- Battery monitoring, location, camera, SQLite, Firebase, maps,
  notifications, SecureStore, React Native basics, navigation

`expo-speech` does not appear in any lab. Text-to-speech is a native device
capability that requires its own API, pitch/rate/language controls, and careful
UX design for a student audience. It is genuinely new territory.

---

## 📦 The One Key Package

```
expo-speech
```

Install with:
```bash
npx expo install expo-speech
```

Docs: https://docs.expo.dev/versions/latest/sdk/speech/

Key API methods you will use:
```js
import * as Speech from 'expo-speech';

Speech.speak(text, options)   // start speaking
Speech.stop()                 // stop immediately
Speech.pause()                // pause (iOS only — handle gracefully on Android)
Speech.resume()               // resume after pause
Speech.isSpeakingAsync()      // returns Promise<boolean>

// options object:
{
  language: 'en-AU',   // Australian English — matches the school context
  pitch: 1.0,          // 1.0 is normal; range 0.5–2.0
  rate: 0.85,          // slightly slower than normal (1.0) — better for students
  onStart: () => {},
  onDone: () => {},
  onStopped: () => {},
  onError: (error) => {},
}
```

---

## 📁 Project Structure

Build exactly this structure. Do not add extra files.

```
stemm-speech/
├── AGENT.md
├── README.md
├── app.json
├── package.json                    ← "main": "expo-router/entry"
│
├── app/
│   ├── _layout.jsx                 ← root layout, SafeAreaView, dark background
│   ├── index.jsx                   ← activity selector — 3 cards (one per activity)
│   └── activity/
│       └── [id].jsx                ← dynamic route — the instructions player screen
│
├── components/
│   ├── InstructionCard.jsx         ← displays one step, highlights text being spoken
│   ├── SpeechControls.jsx          ← play/pause/stop/speed buttons
│   └── ProgressDots.jsx            ← shows which step out of total (e.g. step 2 of 5)
│
├── hooks/
│   └── useSpeechPlayer.js          ← all expo-speech logic lives here
│
└── data/
    └── activities.js               ← the 3 activities with their instruction steps
```

---

## 📋 Data — `data/activities.js`

This file contains the instruction steps for 3 of the 7 STEMM Lab activities.
You only need 3 for the prototype — choose activities 1, 4, and 5 as they
have the most varied step types and clearly benefit from audio.

Structure each activity exactly like this:

```js
export const ACTIVITIES = [
  {
    id: 'parachute',
    activityNumber: 1,
    name: 'Parachute Drop Challenge',
    emoji: '🪂',
    category: 'Engineering',
    categoryColour: '#2563EB',
    steps: [
      {
        id: 1,
        text: 'Drop the toy without a parachute and record the fall as your baseline test.',
        tip: null,
      },
      {
        id: 2,
        text: 'Build a parachute using the paper, string, and tape provided.',
        tip: 'Make sure all four corners are tied evenly.',
      },
      {
        id: 3,
        text: 'Drop the toy with the parachute from the same height and record the fall.',
        tip: null,
      },
      {
        id: 4,
        text: 'Review your speed and landing results in the app.',
        tip: null,
      },
      {
        id: 5,
        text: 'Redesign and test up to three prototypes within twenty minutes.',
        tip: 'Think about what made the first design slow down the toy.',
      },
      {
        id: 6,
        text: 'Upload your videos, record your results, and write your team reflection.',
        tip: null,
      },
    ],
  },
  {
    id: 'earthquake',
    activityNumber: 4,
    name: 'Earthquake-Resistant Structure',
    emoji: '🏗️',
    category: 'Engineering',
    categoryColour: '#2563EB',
    steps: [
      {
        id: 1,
        text: 'Build an anti-vibration layer by folding your paper or cardboard.',
        tip: 'More folds usually means more cushioning.',
      },
      {
        id: 2,
        text: 'Place a flat cardboard platform on top of your anti-vibration layer.',
        tip: null,
      },
      {
        id: 3,
        text: 'Place the phone in the centre of the platform and activate vibration mode in the STEMM App.',
        tip: 'Make sure the phone is flat and centred — not near the edges.',
      },
      {
        id: 4,
        text: 'Watch the vibration reading and note how much your structure moves.',
        tip: null,
      },
      {
        id: 5,
        text: 'Modify your structure to reduce movement. Try more pillars, more folds, or a different layout.',
        tip: 'Record what you change each time so you can compare.',
      },
    ],
  },
  {
    id: 'performance',
    activityNumber: 5,
    name: 'Human Performance Lab',
    emoji: '🏃',
    category: 'Health & Medical',
    categoryColour: '#1A9B7B',
    steps: [
      {
        id: 1,
        text: 'Hold the phone firmly in one hand and activate the vibration sensor in the app.',
        tip: null,
      },
      {
        id: 2,
        text: 'Perform the guided movement slowly, exactly as shown on screen. Record the vibration.',
        tip: 'Slower is better. Try to keep the reading as low as possible.',
      },
      {
        id: 3,
        text: 'Repeat the movement with vibration feedback enabled. Watch the screen as you move.',
        tip: null,
      },
      {
        id: 4,
        text: 'Review your speed, smoothness, and range-of-motion data.',
        tip: null,
      },
      {
        id: 5,
        text: 'Upload your results and reflect as a group. Which team member was the smoothest?',
        tip: null,
      },
    ],
  },
];
```

---

## 🪝 Hook — `hooks/useSpeechPlayer.js`

This is the most important file in the prototype. All `expo-speech` logic lives here.
The screen components must not call `Speech.speak()` directly — only this hook does.

### What the hook manages

```
state:
  currentStepIndex  — which step is currently active (0-based)
  isPlaying         — is speech currently in progress
  isSpeaking        — alias for isPlaying, for component use
  rate              — speech rate (default 0.85, adjustable 0.6–1.2)
  highlightRange    — { start, end } character positions currently being spoken
                      (used to highlight the word being read — see below)

actions (returned from hook):
  play()            — speak the current step's text
  pause()           — pause speech (iOS) or stop (Android — see note)
  stop()            — stop speech and reset to beginning of current step
  nextStep()        — stop speech, advance to next step, auto-play it
  prevStep()        — stop speech, go to previous step
  goToStep(index)   — jump to a specific step
  setRate(value)    — update speech rate (stops current speech, user re-plays)
  speakStep(index)  — speak a specific step by index
```

### Speech rate behaviour

The hook exposes `rate` as state. When the user changes it via the speed buttons:
1. Call `Speech.stop()`
2. Update `rate` state
3. Do NOT auto-replay — let the user press play again
   WHY: auto-replaying after rate change is disorienting

### Auto-advance behaviour

When a step finishes speaking naturally (the `onDone` callback fires):
- Do NOT auto-advance to the next step
- WHY: students need time to physically perform the step before moving on
- Instead: show a visual cue that the step has finished reading
  (e.g. the play button changes to a replay icon)

### Android pause handling

`Speech.pause()` is iOS only. On Android it throws an error.
Handle this gracefully:
```js
const handlePause = async () => {
  if (Platform.OS === 'ios') {
    await Speech.pause();
  } else {
    // Android: stop is the only option
    await Speech.stop();
    // keep isPlaying true visually so user knows where they were
    // but set a separate 'isPaused' flag so the button shows correctly
  }
};
```

### Word highlighting

`expo-speech` on iOS fires `onBoundary` events with word position data.
On Android this event is not reliable.

Implement it as a best-effort enhancement:
- On iOS: use `onBoundary` to update `highlightRange` state
- On Android: highlight the entire step text while speaking (no word-level)
- `InstructionCard` receives `highlightRange` and renders highlighted text

For the word highlight rendering in `InstructionCard`:
Split the step text into three parts: before highlight, highlighted word, after highlight.
Render the highlighted portion with a background colour (`#1A9B7B` at 30% opacity)
and slightly bolder font weight. Do not use any animation library.

### Cleanup

Always call `Speech.stop()` in the useEffect cleanup:
```js
useEffect(() => {
  return () => {
    Speech.stop();
  };
}, []);
```
WHY: if the user navigates away mid-speech, the audio must stop.
Failing to do this is a critical bug — the phone keeps talking after the screen is gone.

---

## 📱 Screens

### `app/index.jsx` — Activity selector

Three activity cards. Each card shows:
- Emoji + activity name
- Activity number badge (e.g. "Activity 1")
- Category chip with category colour
- Step count (e.g. "6 steps")
- A small speaker icon indicating audio is available

Tap any card → navigate to `app/activity/[id]` passing the activity id.

No other functionality on this screen.

### `app/activity/[id].jsx` — Instructions player

This is the main screen. Build it top to bottom:

**1. Header bar**
- Back arrow (navigates back to index)
- Activity emoji + name
- No other header content

**2. Progress dots — `<ProgressDots />`**
- One dot per step
- Current step dot is filled and coloured with `C.primary`
- Completed steps are filled with `C.success` (green)
- Future steps are outlined only
- Step counter text below: "Step 2 of 6"

**3. Instruction card — `<InstructionCard />`**
- Large card, takes majority of screen height
- Step number label at top: "Step 2" in small text
- Step text in large readable font (18sp minimum — students are reading this)
- If the step has a `tip`: show it below the main text in a tinted box
  with a 💡 icon. Tip text is smaller (14sp).
- Highlight the word being spoken (see word highlighting above)
- While speaking: card has a subtle left border in `C.primary` colour

**4. Speech controls — `<SpeechControls />`**
- Row of controls, centred:
  - Previous step button (← arrow) — disabled on step 1
  - Stop button (■) — stops speech, shown only while playing
  - Play / Replay button (▶ or ↺) — main action
  - Next step button (→ arrow) — disabled on last step
- Speed control below the main row:
  - Three buttons: 0.6× | 0.85× | 1.2×
  - Currently selected speed is highlighted
  - Label above: "Reading speed"

**5. Bottom tip (fixed at bottom)**
- Small text: "💡 Tap ▶ to hear this step read aloud"
- Only shown on the very first time the screen loads (first step, never played)
- Disappears after first play

---

## 🎨 Colours and Typography

Use these exactly. Do not use any hex values in JSX — always reference the C object.

```js
const C = {
  primary:        '#1A9B7B',   // teal — primary buttons, active states, highlights
  primaryVariant: '#2563EB',   // blue — engineering category colour
  secondary:      '#10B981',   // green — health category, completed steps
  background:     '#1A1F2E',   // dark navy — all screen backgrounds
  surface:        '#252B3B',   // cards and panels
  surfaceVariant: '#2E3549',   // tip boxes, speed selector backgrounds
  onBackground:   '#F9FAFB',   // primary text
  onSurface:      '#D1D5DB',   // secondary text
  success:        '#10B981',   // completed step dots
  warning:        '#F59E0B',   // not used in this prototype
  error:          '#EF4444',   // error states
  highlight:      '#1A9B7B44', // word highlight background (primary at ~27% opacity)
};
```

Typography:
```js
// Step instruction text — large and readable for students
stepText:    { fontSize: 20, fontWeight: '500', lineHeight: 30 }

// Tip text
tipText:     { fontSize: 14, fontWeight: '400', lineHeight: 20 }

// Step label ("Step 2")
stepLabel:   { fontSize: 12, fontWeight: '600', letterSpacing: 1 }

// Button labels
buttonLabel: { fontSize: 13, fontWeight: '600' }

// Speed buttons
speedLabel:  { fontSize: 12, fontWeight: '700' }
```

---

## ⚙️ Setup Commands

Run these exactly in order after creating the project:

```bash
npx create-expo-app stemm-speech --template blank
cd stemm-speech
npx expo install expo-speech
npx expo install expo-router react-native-safe-area-context react-native-screens
```

In `app.json`, inside the `"expo"` object, add:
```json
"scheme": "stemm-speech"
```

In `package.json`, change the `"main"` field to:
```json
"main": "expo-router/entry"
```

---

## 🚫 Hard Constraints

| Do NOT | Reason |
|---|---|
| Use TypeScript | JS only — matches lab teaching level |
| Use any animation library | Pure RN only |
| Call `Speech.speak()` outside the hook | All speech logic must live in `useSpeechPlayer.js` |
| Auto-advance steps when speech finishes | Students need time to physically do the step |
| Use `react-use` useSpeech | Web Speech API only — does not work in Expo Go on device |
| Put activity data inline in components | All data comes from `data/activities.js` |
| Use more than 3 activities | 3 is enough to demonstrate the feature |
| Write any file over 150 lines | Split into sub-components |

---

## 🔬 Ethical Considerations

These must be mentioned in the student's video presentation.
Build the prototype to support these points being demonstrated.

**1. Accessibility — the primary justification**
Primary school students (Years 5–6) include early readers, ESL students,
and students with dyslexia or other reading difficulties.
Text-to-speech removes the reading barrier from participating in science experiments.
This aligns with WCAG 2.1 Success Criterion 1.3.1 and the app's stated commitment
to accessibility in the Assessment 1 Design Report.

**2. Hands-free learning**
Students cannot read instructions and conduct physical experiments simultaneously.
Audio instructions allow full attention to stay on the experiment.
This directly supports the spec's stated goal of "minimising cognitive load."

**3. Language and voice**
The prototype uses `language: 'en-AU'` (Australian English).
In production, offering multiple languages (e.g. Vietnamese, Mandarin, Arabic —
common languages in Australian schools) would improve equity of access.
This should be noted as a production enhancement.

**4. Privacy**
`expo-speech` uses the device's on-board text-to-speech engine.
No text is sent to any external server. No microphone is used.
There is zero privacy risk from this feature.

**5. Battery impact**
TTS is low-power. A full set of 6 steps read aloud takes under 60 seconds.
Battery impact is negligible.

---

## 📊 Assessment Rubric Coverage

| Rubric requirement | Where it is satisfied |
|---|---|
| New feature not covered in labs | `expo-speech` — not in any lab |
| Relevant to STEMM Lab | Instructions screen is a core spec screen (Screen 7) |
| Solves a real need | Hands-free use + accessibility for early readers |
| Working prototype | Runs on physical device via Expo Go |
| What the feature does | Obvious from demo — press play, hear instructions |
| Why it is needed | Accessibility + hands-free argument in video |
| How it works | Hook architecture + expo-speech API calls |
| Limitations | Android pause limitation; word boundary on Android |
| Technical feasibility | expo-speech is stable, maintained, cross-platform |
| Performance | Low battery, low memory, no network required |
| Privacy | On-device TTS engine, no data transmitted |
| Accessibility | This feature IS the accessibility feature |
| Include in final app? | Yes — every activity's instructions screen benefits |

---

## 📹 Video Structure for Student

The student will record a video using this prototype. Build it so these moments
are clearly demonstrable:

1. Show `app/index.jsx` — three activity cards with speaker icons
2. Tap Parachute Drop → show the instructions screen
3. Press ▶ on Step 1 — phone speaks the instruction aloud
4. While it speaks — show the word highlight / active border on the card
5. Press → to go to Step 2 — auto-plays (because moving forward is intentional)
   Actually — do auto-play on Next/Prev button press but NOT on natural completion.
   WHY: student actively chose to advance, so playing immediately makes sense.
6. Change speed to 0.6× — demonstrate slower reading for younger students
7. Navigate away mid-speech — audio stops (demonstrates cleanup)
8. Go to Human Performance Lab — show same feature works across activities

---

## 📝 README.md

Write this README exactly as shown:

```md
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
```

---

## ✅ Definition of Done

The prototype is complete when:

- [ ] `npx expo start` runs without errors
- [ ] App opens on a physical device via Expo Go
- [ ] All 3 activity cards appear on the home screen
- [ ] Tapping a card opens that activity's instructions
- [ ] Pressing ▶ speaks the current step aloud in Australian English
- [ ] The active instruction card shows a visual speaking indicator
- [ ] Word highlighting works on iOS (full-line on Android is acceptable)
- [ ] ← and → buttons navigate between steps; next/prev triggers auto-play
- [ ] Speed buttons (0.6× / 0.85× / 1.2×) change the speech rate
- [ ] Stop button halts speech immediately
- [ ] Navigating away from the screen stops any ongoing speech
- [ ] Progress dots correctly show current and completed steps
- [ ] Steps with tips show the tip box with 💡 icon
- [ ] README.md exists and matches the template above

---

*Last updated: April 2026 | CSE3MAD Assessment 3*
*Feature: expo-speech — Text-to-Speech for Activity Instructions*
*App: STEMM Lab | La Trobe University*
