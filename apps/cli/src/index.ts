/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import path from "node:path"

import { countKinds as kinds, outline } from "@platform/quiz/outline"
import { type Quiz, type Settings, Session, show } from "@platform/quiz/play"
import { loadQuiz } from "@platform/quiz/quizzes"
import {
  readSavedGame,
  readSettings,
  type SavedGame,
} from "@platform/quiz/saved"

let quiz: Quiz
let settings: Settings
let game: SavedGame

try {
  quiz = await loadQuiz("survival")
  settings = await readSettings(
    path.join(import.meta.dirname, "..", "saved", "settings.json"),
  )
  game = await readSavedGame(
    path.join(import.meta.dirname, "..", "saved", "game.json"),
  )
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}

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
const { answers } = game

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
