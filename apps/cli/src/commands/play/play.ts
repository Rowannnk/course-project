import { type Answer, recap, Session } from "@platform/quiz/play"
import { loadQuiz } from "@platform/quiz/quizzes"
import { readSettings } from "@platform/quiz/saved"

import { printIntro, printResult } from "../../lib/print.ts"
import { locateSettings } from "../../lib/saved.ts"
import { ask } from "./ask.ts"

interface Options {
  name?: string
}

export default async function play(
  quizName: string,
  options: Options,
): Promise<void> {
  const quiz = await loadQuiz(quizName)
  const settings = await readSettings(locateSettings())

  printIntro(options.name ?? settings.name, quiz)

  const session = new Session(quiz.outcomes)
  const answers: Answer[] = []

  session.start()

  console.log("## Questions")
  console.log("")

  for (const question of quiz.questions) {
    const answer = await ask(settings, question)
    const { outcome, points } = session.record(question, answer)

    answers.push(answer)

    console.log(`Your answer worth ${points} points for ${outcome}`)
    console.log("")
  }

  console.log("## Recap")
  console.log("")

  for (const [index, question] of quiz.questions.entries()) {
    console.log(recap(question, answers[index]))
  }

  console.log("")

  printResult(session)
}
