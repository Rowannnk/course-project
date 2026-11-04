import { type Prompt, type Submission } from "@platform/quiz/play"

const baseUrl = "http://localhost:3000"

export interface PromptQuiz {
  questions: Prompt[]
}

export interface Result {
  title: string
  description: string
  reasons: string[]
}

export async function fetchQuiz(name: string): Promise<PromptQuiz> {
  const response = await call(`/quizzes/${encodeURIComponent(name)}`)

  return json<PromptQuiz>(response)
}

export async function startSession(quiz: string): Promise<string> {
  const response = await call("/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ quiz }),
  })
  const body = await json<{ session_id: string }>(response)

  return body.session_id
}

export async function sendAnswer(
  id: string,
  submission: Submission,
): Promise<void> {
  await call("/session/answer", {
    method: "POST",
    headers: { "content-type": "application/json", "x-session-id": id },
    body: JSON.stringify(submission),
  })
}

export async function fetchResult(id: string): Promise<Result> {
  const response = await call("/session/result", {
    headers: { "x-session-id": id },
  })

  return json<Result>(response)
}

async function call(path: string, init?: RequestInit): Promise<Response> {
  let response: Response

  try {
    response = await fetch(`${baseUrl}${path}`, init)
  } catch {
    throw new Error(`Cannot reach the server at ${baseUrl}`)
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: string
    }

    throw new Error(body.error ?? `The server answered ${response.status}`)
  }

  return response
}

async function json<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}
