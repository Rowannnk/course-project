import { questions } from "./data.ts"
import { award, outcomeFor, recap, show } from "./quiz.ts"
import { type Answer } from "./types.ts"

const answers: Answer[] = [
  { kind: "choice", picked: { label: "Run as fast as I can", points: 2 } },
  { kind: "scale", value: 2 },
  { kind: "yesno", value: true },
]

let total = 0

for (const index in questions) {
  const question = questions[index]
  const answer = answers[index]

  const points = award(answer)
  total += points

  console.log(show(question))
  console.log(`Answer worth ${points} points`)
}

console.log(`Total ${total}`)

for (const index in questions) {
  console.log(recap(questions[index], answers[index]))
}

const outcome = outcomeFor(total)
console.log(`${outcome.title}\n${outcome.description}`)
