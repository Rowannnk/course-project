import { quiz } from "./data.ts"
import { loadSavedGame, loadSettings } from "./lib/load.ts"
import { show } from "./lib/quiz.ts"
import { Session } from "./lib/session.ts"
import { savedGame, savedSettings } from "./saved.ts"

const settings = loadSettings(savedSettings)

console.log(`Hello, ${settings.name}`)

const session = new Session(quiz.outcomes)
const { answers } = loadSavedGame(savedGame)

session.start()

for (const index in quiz.questions) {
  const question = quiz.questions[index]
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
