import { countKinds as kinds, outline } from "@platform/quiz/outline"
import { type Prompt, recap, type Submission } from "@platform/quiz/play"

import { type PromptQuiz, type Result } from "./api.ts"

export function printIntro(name: string, quiz: PromptQuiz): void {
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

export function printRecap(prompts: Prompt[], submissions: Submission[]): void {
  console.log("## Recap")
  console.log("")

  for (const [index, prompt] of prompts.entries()) {
    console.log(recap(prompt, submissions[index]))
  }

  console.log("")
}

export function printResult(result: Result): void {
  console.log("## Result")
  console.log("")
  console.log(`You are: ${result.title}`)
  console.log(result.description)
  console.log("")
  console.log("You got this because:")

  for (const reason of result.reasons) {
    console.log(`- ${reason}`)
  }

  console.log("")
}
