const BASE_URL = "http://localhost:3000"

export async function request<Reply extends object = object>(
  path: string,
  init?: RequestInit,
): Promise<Reply> {
  const response = await call(path, init)

  return (await response.json()) as Reply
}

export async function call(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  let response: Response

  try {
    response = await fetch(`${BASE_URL}${path}`, init)
  } catch {
    throw new Error(`Cannot reach the server at ${BASE_URL}`)
  }

  if (!response.ok) {
    let message = `The server answered ${response.status}`

    try {
      const body = (await response.json()) as { error?: string }

      message = body.error ?? message
    } catch {
      // Not JSON, so the status is the message.
    }

    throw new Error(message)
  }

  return response
}
