import { type Question } from "./types.ts"

export const questions: Question[] = [
  {
    kind: "choice",
    text: "A stranger with a knife starts chasing you down a dark street. What do you do?",
    choices: [
      { label: "Close my eyes and pray", points: 0 },
      { label: "Hide behind a car and stay quiet", points: 1 },
      { label: "Run as fast as I can", points: 2 },
      { label: "Turn around and fight back", points: 3 },
    ],
  },
  {
    kind: "scale",
    text: "How calm do you stay when something scary happens?",
    low: "total panic",
    high: "ice cold",
  },
  {
    kind: "yesno",
    text: "Would you go down to the basement to check a strange noise?",
  },
]
