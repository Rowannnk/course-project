import { countKinds as kinds, outline } from "@platform/quiz/outline"
import { type Quiz, type Session } from "@platform/quiz/play"

export function printIntro(name: string, quiz: Quiz): void {
  console.log(`Hello, ${name}`)
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
}

export function printResult(session: Session): void {
  session.finish()

  const result = session.result()

  console.log(`You are: ${result.title}`)
  console.log(result.description)

  console.log("")
  console.log("You got this because:")

  for (const reason of session.explain()) {
    console.log(`- ${reason}`)
  }
}
