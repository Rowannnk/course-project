import { outcomes, questions } from "./data.ts"
import { show } from "./quiz.ts"
import { Session } from "./session.ts"
import { type Answer } from "./types.ts"

const answers: Answer[] = [
  {
    kind: "choice",
    picked: { label: "Run as fast as I can", outcome: "sprinter", points: 3 },
  },
  { kind: "scale", value: 4 },
  { kind: "yesno", value: true },
]

const session = new Session(outcomes)

session.start()

for (const index in questions) {
  const question = questions[index]
  const answer = answers[index]

  const { outcome, points } = session.record(question, answer)

  console.log(show(question))
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
