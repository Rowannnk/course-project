import { Session, show } from "@platform/quiz/play"
import { loadQuiz } from "@platform/quiz/quizzes"
import { readSavedGame, readSettings } from "@platform/quiz/saved"

import { printIntro, printResult } from "../../lib/print.ts"
import { locateSavedGame, locateSettings } from "../../lib/saved.ts"

export default async function replay(quizName: string): Promise<void> {
  const quiz = await loadQuiz(quizName)
  const settings = await readSettings(locateSettings())
  const { answers } = await readSavedGame(locateSavedGame())

  printIntro(settings.name, quiz)

  const session = new Session(quiz.outcomes)

  session.start()

  for (const [index, question] of quiz.questions.entries()) {
    const { outcome, points } = session.record(question, answers[index])

    console.log(show(question, settings.hints !== false))
    console.log(`Answer worth ${points} points for ${outcome}`)
  }

  printResult(session)
}
