/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { quiz } from "@platform/quiz/data"
import { countKinds as kinds, outline } from "@platform/quiz/outline"
import { Session, show } from "@platform/quiz/play"
import { loadSavedGame, loadSettings } from "@platform/quiz/saved"

import { savedGame, savedSettings } from "./saved.ts"

const settings = loadSettings(savedSettings)

console.log(`Hello, ${settings.name}`)
console.log("")
console.log("## Outline")
console.log("")

for (const line of outline(quiz)) {
  console.log(line)
}

console.log("")

const counts = Object.entries(kinds(quiz))
  .map(([kind, count]) => `${kind} ${count}`)
  .join(", ")

console.log(`Kinds: ${counts}`)
console.log("")

const session = new Session(quiz.outcomes)
const { answers } = loadSavedGame(savedGame)

session.start()

for (const [index, question] of quiz.questions.entries()) {
  const answer = answers[index]

  const { outcome, points } = session.record(question, answer)

  console.log(show(question, settings.hints !== false))
  console.log(`Answer worth ${points} points for ${outcome}`)
}

session.finish()

const result = session.result()

console.log(`You are: ${result.title}`)
console.log(result.description)

console.log("")
console.log("You got this because:")

for (const reason of session.explain()) {
  console.log(`- ${reason}`)
}

console.log("")

try {
  loadSavedGame('{"answers":[{"kind":"scale","value":"five"}]}')
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}

try {
  loadSettings('{"hints":"yes"}')
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}

try {
  loadSettings("not valid text")
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
