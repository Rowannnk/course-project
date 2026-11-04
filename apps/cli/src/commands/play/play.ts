import { type Submission } from "@platform/quiz/play"
import { readSettings } from "@platform/quiz/saved"

import {
  fetchQuiz,
  fetchResult,
  sendAnswer,
  startSession,
} from "../../lib/api.ts"
import { printIntro, printRecap, printResult } from "../../lib/print.ts"
import { locateSettings } from "../../lib/saved.ts"
import { ask } from "./ask.ts"

interface Options {
  name?: string
}

export default async function play(
  quizName: string,
  options: Options,
): Promise<void> {
  const quiz = await fetchQuiz(quizName)
  const settings = await readSettings(locateSettings())

  printIntro(options.name ?? settings.name, quiz)

  const id = await startSession(quizName)
  const submissions: Submission[] = []

  console.log("## Questions")
  console.log("")

  for (const prompt of quiz.questions) {
    const submission = await ask(settings, prompt)

    await sendAnswer(id, submission)
    submissions.push(submission)

    console.log("")
  }

  printRecap(quiz.questions, submissions)
  printResult(await fetchResult(id))
}
