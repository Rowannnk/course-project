import { type Answer, type Question } from "./types.ts"

export function show(question: Question): string {
  if (question.kind === "choice") {
    const choices = question.choices.map(
      (choice, index) => `  ${index + 1}. ${choice.label}`,
    )

    return `${question.text}\n${choices.join("\n")}`
  }

  if (question.kind === "scale") {
    return `${question.text} (1 = ${question.low}, 5 = ${question.high})`
  }

  if (question.kind === "yesno") {
    return `${question.text} (yes or no)`
  }

  throw new Error("Unknown kind")
}

export function recap(question: Question, answer: Answer): string {
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
