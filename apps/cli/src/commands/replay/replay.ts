import { show } from "@platform/quiz/play"
import { readSavedGame, readSettings } from "@platform/quiz/saved"
import {
  getQuiz,
  getResult,
  sendAnswer,
  startSession,
} from "@platform/quiz/services"

import { printIntro, printRecap, printResult } from "../../lib/print.ts"
import { locateSavedGame, locateSettings } from "../../lib/saved.ts"

export default async function replay(quizName: string): Promise<void> {
  const quiz = await getQuiz(quizName)
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
  printResult(await getResult(id))
}
