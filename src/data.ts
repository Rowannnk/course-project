import { type Outcome, type Question } from "./types.ts"

export const outcomes: Outcome[] = [
  {
    id: "believer",
    title: "The Believer",
    description:
      "Hopeful and faithful. You pray first, and somehow it works out.",
  },
  {
    id: "hider",
    title: "The Hider",
    description: "Calm and quiet. You disappear before anyone notices.",
  },
  {
    id: "sprinter",
    title: "The Sprinter",
    description: "Smart and fast. You never wait to find out what happens.",
  },
  {
    id: "fighter",
    title: "The Fighter",
    description: "Brave and loud. You turn around and swing first.",
  },
]

export const questions: Question[] = [
  {
    kind: "choice",
    text: "A stranger with a knife starts chasing you down a dark street. What do you do?",
    choices: [
      { label: "Close my eyes and pray", outcome: "believer", points: 3 },
      {
        label: "Hide behind a car and stay quiet",
        outcome: "hider",
        points: 3,
      },
      { label: "Run as fast as I can", outcome: "sprinter", points: 3 },
      { label: "Turn around and fight back", outcome: "fighter", points: 3 },
    ],
  },
  {
    kind: "scale",
    text: "How likely are you to bolt the moment you sense danger?",
    low: "never",
    high: "instantly",
    outcome: "sprinter",
  },
  {
    kind: "yesno",
    text: "Would you go down to the basement to check a strange noise?",
    outcome: "fighter",
  },
]
