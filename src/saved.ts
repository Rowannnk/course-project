import { type Answer } from "./lib/types.ts"

const initialAnswers: Answer[] = [
  {
    kind: "choice",
    picked: { label: "Run as fast as I can", outcome: "sprinter", points: 3 },
  },
  { kind: "scale", value: 4 },
  { kind: "yesno", value: true },
]

export const savedGame = JSON.stringify({
  answers: initialAnswers,
  startedAt: new Date(),
})

export const savedSettings = JSON.stringify({
  name: "Survivor",
  hints: false,
})
