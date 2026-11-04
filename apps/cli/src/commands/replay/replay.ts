import { show } from "@platform/quiz/play"
import { readSavedGame, readSettings } from "@platform/quiz/saved"

import {
  fetchQuiz,
  fetchResult,
  sendAnswer,
  startSession,
} from "../../lib/api.ts"
import { printIntro, printRecap, printResult } from "../../lib/print.ts"
import { locateSavedGame, locateSettings } from "../../lib/saved.ts"

export default async function replay(quizName: string): Promise<void> {
  const quiz = await fetchQuiz(quizName)
  const settings = await readSettings(locateSettings())
  const { answers } = await readSavedGame(locateSavedGame())

  if (answers.length !== quiz.questions.length) {
    throw new Error("The saved game does not answer every question")
  }

  printIntro(settings.name, quiz)

  const id = await startSession(quizName)

  console.log("## Questions")
  console.log("")

  for (const [index, prompt] of quiz.questions.entries()) {
    console.log(show(prompt, settings.hints !== false))

    await sendAnswer(id, answers[index])

    console.log("")
  }

  printRecap(quiz.questions, answers)
  printResult(await fetchResult(id))
}
