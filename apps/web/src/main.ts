import {
  getProgress,
  getQuiz,
  getResult,
  sendAnswer,
  startSession,
} from "@platform/quiz/services"

import ask from "./ask/index.ts"
import showResult from "./result/index.ts"

const app = document.querySelector<HTMLElement>("#app")
if (!app) {
  throw new Error('No element with id "app"')
}

play(app, "survival").catch((error: unknown) => {
  app.textContent =
    error instanceof Error ? error.message : "Something went wrong"
})

async function play(app: HTMLElement, quizName: string): Promise<void> {
  const quiz = await getQuiz(quizName)
  const id = await startSession(quizName)

  for (const prompt of quiz.questions) {
    const { answered, total } = await getProgress(id)
    const submission = await ask(
      app,
      prompt,
      `Question ${answered + 1} of ${total}`,
    )

    await sendAnswer(id, submission)
  }

  showResult(app, await getResult(id))
}
