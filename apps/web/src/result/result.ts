import { type ResultResponse } from "@platform/quiz/play"

export default function showResult(
  app: HTMLElement,
  result: ResultResponse,
): void {
  const title = document.createElement("h2")
  const description = document.createElement("p")
  const why = document.createElement("h3")
  const list = document.createElement("ul")
  list.className = "reasons"

  title.textContent = `You are: ${result.title}`
  description.textContent = result.description
  why.textContent = "You got this because:"

  for (const reason of result.reasons) {
    const item = document.createElement("li")

    item.textContent = reason

    list.append(item)
  }

  app.replaceChildren(title, description, why, list)
}
