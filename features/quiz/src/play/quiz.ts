import {
  type Answer,
  type Prompt,
  type Question,
  type Submission,
} from "./types.ts"

export interface Award {
  outcome: string
  points: number
}

export function show(question: Prompt, hints: boolean = true): string {
  const hint = hints && question.hint ? `\nHint: ${question.hint}` : ""

  if (question.kind === "choice") {
    const choices = question.choices.map(
      (choice, index) => `  ${index + 1}. ${choice.label}`,
    )

    return `${question.text}\n${choices.join("\n")}${hint}`
  }

  if (question.kind === "scale") {
    return `${question.text} (1 = ${question.low}, 5 = ${question.high})${hint}`
  }

  if (question.kind === "yesno") {
    return `${question.text} (yes or no)${hint}`
  }

  throw new Error("Unknown kind")
}

export function recap(question: Prompt, answer: Submission): string {
  if (answer.kind === "choice") {
    if (question.kind !== "choice") {
      throw new Error("Question and answer are not the same kind")
    }

    return `${question.text} You chose ${answer.picked.label}.`
  }

  if (answer.kind === "scale") {
    if (question.kind !== "scale") {
      throw new Error("Question and answer are not the same kind")
    }

    return `${question.text} You rated it ${answer.value} out of 5.`
  }

  if (answer.kind === "yesno") {
    if (question.kind !== "yesno") {
      throw new Error("Question and answer are not the same kind")
    }

    return `${question.text} You said ${answer.value ? "yes" : "no"}.`
  }

  throw new Error("Unknown kind")
}

export function award(question: Question, answer: Answer): Award {
  if (question.kind !== answer.kind) {
    throw new Error("The answer does not match the question")
  }

  if (question.kind === "choice" && answer.kind === "choice") {
    return { outcome: answer.picked.outcome, points: answer.picked.points }
  }

  if (question.kind === "scale" && answer.kind === "scale") {
    return { outcome: question.outcome, points: answer.value }
  }

  if (question.kind === "yesno" && answer.kind === "yesno") {
    return { outcome: question.outcome, points: answer.value ? 1 : 0 }
  }

  throw new Error("Unknown kind")
}
