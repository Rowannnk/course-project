# Would You Survive the Chase?

A horror-survival personality quiz built with TypeScript for the **Advanced JavaScript and TypeScript** course. You can play it in the terminal or in a browser page, and both talk to the same server.

## About the Quiz

Each question puts you in a scary situation, like being chased in the dark or hearing footsteps behind you, and asks what you would do. There are no right answers, it's just for fun.

Every answer gives points to one survivor type, and the survivor with the most points is your result:

| Survivor     | Style                         |
| ------------ | ----------------------------- |
| The Believer | Prays and hopes for the best  |
| The Hider    | Disappears quietly            |
| The Sprinter | Runs without thinking         |
| The Fighter  | Turns around and swings first |

## Workspace

The project is a pnpm workspace managed with Nx:

- `apps/api` (`@platform/api`): a Fastify server that serves a quiz without its scoring, scores the answers of a session, and sends back the result
- `apps/cli` (`@platform/cli`): the command-line program, which plays a quiz through the API
- `apps/web` (`@platform/web`): a Vite page that asks the questions one at a time in the browser, shows how far along the quiz is, and shows the result
- `features/quiz` (`@platform/quiz`): the quiz code, in folders that other code reaches only through their indexes
- `internal/tooling` (`@platform/tooling`): the shared TypeScript, Prettier and ESLint settings, which the other packages use through `workspace:*`
- `.github/workflows/quiz.yml`: runs the checks on GitHub when anything in `apps`, `features` or `internal` changes

The tools every package needs (ESLint, knip, Prettier and TypeScript) are pinned once in the catalog in `pnpm-workspace.yaml`.

## How It Fits Together

The points of every choice stay on the server. The CLI and the page get each question as a **prompt**, which is a question without its scoring, and send each answer back as a **submission**, which names the choice it picked by its label. The server finds the real choice, scores it, and sends back the result and the reasons for it. Neither client ever sees a point.

Prompts and submissions are made from the real question and answer types with `Omit` and `Pick`, so they cannot drift apart from them.

Both clients make their requests with the functions of the `services` modlet, so the address of the server and the way a request fails are written in one place.

## The API

The server listens on port 3000 and allows the page to read its replies (CORS). A session id in the `x-session-id` header stands in for signing in.

| Route                  | What it does                                                  | Status codes                    |
| ---------------------- | ------------------------------------------------------------- | ------------------------------- |
| `GET /quizzes/:name`   | The questions of a quiz, without any scoring                  | 200, 404                        |
| `POST /session`        | Starts a session for the quiz named in the body               | 201 with `session_id`, 400, 404 |
| `GET /session`         | How far the session has got (`answered`, `total`)             | 200, 401                        |
| `POST /session/answer` | Records the answer to the next question                       | 204, 400, 401, 409              |
| `GET /session/result`  | The result and its reasons, once every question has an answer | 200, 401, 409                   |

## What I Built

The quiz package has an `exports` map, so other code can import `@platform/quiz/play`, `@platform/quiz/saved`, `@platform/quiz/outline`, `@platform/quiz/quizzes` and `@platform/quiz/services`, and nothing inside those folders. A path like `@platform/quiz/play/session` is not found.

In `features/quiz/src`:

- `play/`: the types (`Question`, `Answer`, `Prompt`, `Submission`, `Outcome`, `Quiz`, `Settings` and the reply types), `show` and `recap`, `award`, the `Session` class (tally, status, result and `explain`), and the guards that check data from outside
- `quizzes/`: the quiz itself in `survival.json`, and `loadQuiz`, which stops with a clear message when the file is missing, not valid JSON, or not shaped like a quiz
- `saved/`: `loadSavedGame`, `loadSettings`, `readSavedGame` and `readSettings`, which reject a bad save with its own message
- `outline/`: `outline` (one line per question with its number, text and kind) and `countKinds` (how many questions of each kind)
- `services/`: `getQuiz`, `startSession`, `sendAnswer`, `getResult` and `getProgress`, which hold the address of the server and turn the ways a request can fail into errors

In `apps/api/src`:

- `routes/quizzes/`: the plugin for the quizzes
- `routes/session/`: the plugin for the session, with its storage and the check that turns a submission into a real answer
- `shared/quizzes/`: finds a quiz by name

In `apps/cli`:

- `src/commands/play/`: asks each question with a prompt that fits its kind, sends the answer to the server, and prints the result
- `src/commands/replay/`: does the same with the answers saved in `saved/game.json`, without asking
- `src/lib/`: where the settings and the saved game are, and the printing shared by both commands
- `saved/`: the saved game (a submission for each question) and the settings (a name and whether to show hints)

In `apps/web`:

- `src/main.ts`: gets the quiz, starts a session, and for each question asks for the progress, shows the question, and sends the answer
- `src/ask/`: shows one question with a button for each answer, with a line such as `Question 2 of 3` above it, and hands back the answer that is clicked
- `src/result/`: shows the result and the reasons for it
- `src/style.css`: the dark, red-lit look of the page

The shared settings live in `internal/tooling`: a TypeScript base config, a Prettier config, and an ESLint config that takes the directory of the package being linted.

## Current Stage

The quiz can be played in the terminal and in the browser. Both get the quiz from the API, start a session, send each answer, and show the result the server sends back.

In the terminal, an error stops the program with one message and the exit code 1: the server is not running, there is no such quiz, or a saved file is missing or broken. Cancelling a prompt with Ctrl+C exits quietly. In the page, an error is shown in place of the question.

Example output of `replay` (the answers come from `saved/game.json`):

```text
Hello, Survivor

## Outline

1. A stranger with a knife starts chasing you down a dark street. What do you do? (choice, 4 options)
2. How likely are you to bolt the moment you sense danger? (scale)
3. Would you go down to the basement to check a strange noise? (yes or no)

Kinds: choice 1, scale 1, yesno 1

## Questions

A stranger with a knife starts chasing you down a dark street. What do you do?
  1. Close my eyes and pray
  2. Hide behind a car and stay quiet
  3. Run as fast as I can
  4. Turn around and fight back

How likely are you to bolt the moment you sense danger? (1 = never, 5 = instantly)

Would you go down to the basement to check a strange noise? (yes or no)

## Recap

A stranger with a knife starts chasing you down a dark street. What do you do? You chose Run as fast as I can.
How likely are you to bolt the moment you sense danger? You rated it 4 out of 5.
Would you go down to the basement to check a strange noise? You said yes.

## Result

You are: The Sprinter
Smart and fast. You never wait to find out what happens.

You got this because:
- A stranger with a knife starts chasing you down a dark street. What do you do? You chose Run as fast as I can.
- How likely are you to bolt the moment you sense danger? You rated it 4 out of 5.
```

## Getting Started

Start the API first, in one terminal:

```bash
pnpm install
pnpm --filter @platform/api dev
```

Then play it in the terminal, in another terminal:

```bash
pnpm --filter @platform/cli start play          # answer the quiz by prompt
pnpm --filter @platform/cli start play -n Bo    # greet someone by name
pnpm --filter @platform/cli start replay        # replay the saved answers
pnpm --filter @platform/cli start --help        # list the commands
```

Or play it in the browser:

```bash
pnpm --filter @platform/web dev                 # open the address Vite prints
```

If the API is not running, the CLI prints `Cannot reach the server at http://localhost:3000`, and the page shows the same message.

## Checks

| Command          | What it does                                                  |
| ---------------- | ------------------------------------------------------------- |
| `pnpm lint`      | Runs every check in every package through Nx, `tooling` first |
| `pnpm -r format` | Formats every package with Prettier                           |
| `pnpm nx graph`  | Shows how the packages depend on each other                   |

`pnpm lint` runs four checks in each package: TypeScript (`tsc --noEmit`), ESLint, Prettier and knip. Knip runs from the workspace root (`--directory ../..`) so that it can read the catalog in `pnpm-workspace.yaml`.