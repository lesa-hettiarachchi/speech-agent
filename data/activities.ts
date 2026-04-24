export interface Step {
  id: number;
  text: string;
  tip: string | null;
}

export interface Activity {
  id: string;
  activityNumber: number;
  name: string;
  emoji: string;
  category: string;
  categoryColour: string;
  steps: Step[];
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'parachute',
    activityNumber: 1,
    name: 'Parachute Drop Challenge',
    emoji: '🪂',
    category: 'Engineering',
    categoryColour: '#2563EB',
    steps: [
      { id: 1, text: 'Drop the toy without a parachute and record the fall as your baseline test.', tip: null },
      { id: 2, text: 'Build a parachute using the paper, string, and tape provided.', tip: 'Make sure all four corners are tied evenly.' },
      { id: 3, text: 'Drop the toy with the parachute from the same height and record the fall.', tip: null },
      { id: 4, text: 'Review your speed and landing results in the app.', tip: null },
      { id: 5, text: 'Redesign and test up to three prototypes within twenty minutes.', tip: 'Think about what made the first design slow down the toy.' },
      { id: 6, text: 'Upload your videos, record your results, and write your team reflection.', tip: null },
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
      { id: 1, text: 'Build an anti-vibration layer by folding your paper or cardboard.', tip: 'More folds usually means more cushioning.' },
      { id: 2, text: 'Place a flat cardboard platform on top of your anti-vibration layer.', tip: null },
      { id: 3, text: 'Place the phone in the centre of the platform and activate vibration mode in the STEMM App.', tip: 'Make sure the phone is flat and centred — not near the edges.' },
      { id: 4, text: 'Watch the vibration reading and note how much your structure moves.', tip: null },
      { id: 5, text: 'Modify your structure to reduce movement. Try more pillars, more folds, or a different layout.', tip: 'Record what you change each time so you can compare.' },
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
      { id: 1, text: 'Hold the phone firmly in one hand and activate the vibration sensor in the app.', tip: null },
      { id: 2, text: 'Perform the guided movement slowly, exactly as shown on screen. Record the vibration.', tip: 'Slower is better. Try to keep the reading as low as possible.' },
      { id: 3, text: 'Repeat the movement with vibration feedback enabled. Watch the screen as you move.', tip: null },
      { id: 4, text: 'Review your speed, smoothness, and range-of-motion data.', tip: null },
      { id: 5, text: 'Upload your results and reflect as a group. Which team member was the smoothest?', tip: null },
    ],
  },
];
