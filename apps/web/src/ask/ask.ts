import { type Prompt, type Submission } from "@platform/quiz/play"

import { optionsFor } from "./options.ts"

export default function ask(
  app: HTMLElement,
  prompt: Prompt,
  progress: string,
): Promise<Submission> {
  const options = optionsFor(prompt)
  const progressLine = document.createElement("p")
  const heading = document.createElement("h2")
  const list = document.createElement("ul")

  progressLine.textContent = progress
  progressLine.className = "progress"
  heading.textContent = prompt.text

  for (const [index, option] of options.entries()) {
    const item = document.createElement("li")
    const button = document.createElement("button")

    button.textContent = option.label
    button.dataset.index = String(index)

    item.append(button)
    list.append(item)
  }

  app.replaceChildren(progressLine, heading, list)

  if (prompt.hint) {
    const hint = document.createElement("p")

    hint.textContent = prompt.hint
    hint.className = "hint"

    heading.after(hint)
  }

  return new Promise((resolve) => {
    function handleClick(event: MouseEvent): void {
      if (!(event.target instanceof HTMLElement)) {
        return
      }

      const button = event.target.closest("button")
      if (!button) {
        return
      }

      list.removeEventListener("click", handleClick)

      resolve(options[Number(button.dataset.index)].submission)
    }

    list.addEventListener("click", handleClick)
  })
}
