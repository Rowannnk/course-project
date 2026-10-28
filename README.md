# Would You Survive the Chase?

A horror-survival personality quiz built with TypeScript for the **Advanced JavaScript and TypeScript** course.

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

- `features/quiz`: the quiz package
- `internal/tooling`: the shared TypeScript, Prettier and ESLint settings, which the quiz package uses through `workspace:*`
- `.github/workflows/quiz.yml`: runs the checks on GitHub when the quiz or the tooling changes

The tools every package needs (ESLint, knip, Prettier and TypeScript) are pinned once in the catalog in `pnpm-workspace.yaml`.

## What I Built

All of the quiz code is in `features/quiz/src`:

- `lib/types.ts`: an `OutcomeId` union, an `Outcome` with an id, a `Question` union of three kinds (choice, scale, yes/no) with an optional hint, an `Answer` union to match, and a `Quiz` that holds the outcomes and questions
- `lib/quiz.ts`: `show` prints a question (with its hint, if hints are on) and `recap` writes one sentence about an answer
- `lib/session.ts`: a `Session` class that keeps a tally per outcome, moves from waiting to asking to done, picks the result, and keeps the reasons behind each outcome so `explain` can say why you got your result
- `lib/load.ts`: loads a saved game and saved settings from text. Guards (`isSavedGame`, `isSettings`, `isAnswer`, `isChoice`) check every piece, so a bad save is rejected with its own message
- `data.ts`: the four survivor outcomes and the survival questions, exported as a read-only quiz
- `saved.ts`: a saved game (the answers and a start time) and saved settings (a name and whether to show hints)
- `index.ts`: loads the settings, greets the player, plays the saved game, prints the result and the reasons, and shows what happens with broken saves

The shared settings live in `internal/tooling`: a TypeScript base config, a Prettier config, and an ESLint config that takes the directory of the package being linted.

## Current Stage

The quiz loads saved settings and greets the player by name. It then loads a saved game, records the answers in a session, and picks the survivor with the most points. Hints are shown only when the settings allow them. At the end it prints a result card and the reasons for it, then tries three broken saves to show that each kind of failure has its own error message.

Example output:

```text
Hello, Survivor
A stranger with a knife starts chasing you down a dark street. What do you do?
  1. Close my eyes and pray
  2. Hide behind a car and stay quiet
  3. Run as fast as I can
  4. Turn around and fight back
Answer worth 3 points for sprinter
...
You are: The Sprinter
Smart and fast. You never wait to find out what happens.

You got this because:
- A stranger with a knife starts chasing you down a dark street. What do you do? You chose Run as fast as I can.
- How likely are you to bolt the moment you sense danger? You rated it 4 out of 5.

The saved game is missing a piece or has the wrong kind of piece
The saved settings need a name and, if present, a true or false hints
The saved settings are not valid text
```

## Getting Started

```bash
pnpm install
pnpm --filter quiz start
```

## Checks

| Command                     | What it does                                                  |
| --------------------------- | ------------------------------------------------------------- |
| `pnpm lint`                 | Runs every check in every package through Nx, `tooling` first |
| `pnpm nx graph`             | Shows how the packages depend on each other                   |
| `pnpm --filter quiz format` | Formats the quiz package with Prettier                        |

`pnpm lint` runs four checks in each package: TypeScript (`tsc --noEmit`), ESLint, Prettier and knip. Knip runs from the workspace root (`--directory ../..`) so that it can read the catalog in `pnpm-workspace.yaml`.
