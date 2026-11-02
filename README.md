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

- `apps/cli` (`@platform/cli`): the command-line script. It uses the quiz package only through its exports
- `features/quiz` (`@platform/quiz`): the quiz code, in folders that other code reaches only through their indexes
- `internal/tooling` (`@platform/tooling`): the shared TypeScript, Prettier and ESLint settings, which the other packages use through `workspace:*`
- `.github/workflows/quiz.yml`: runs the checks on GitHub when anything in `apps`, `features` or `internal` changes

The tools every package needs (ESLint, knip, Prettier and TypeScript) are pinned once in the catalog in `pnpm-workspace.yaml`.

## What I Built

The quiz package has an `exports` map, so the CLI can import `@platform/quiz/data`, `@platform/quiz/play`, `@platform/quiz/saved` and `@platform/quiz/outline`, and nothing inside those folders. A path like `@platform/quiz/play/session` is not found.

In `features/quiz/src`:

- `data.ts`: the four survivor outcomes and the survival questions, exported as a read-only quiz
- `play/`: the types (`Question` and `Answer` unions, `Outcome`, `Quiz`, `Settings`), `show` and `recap`, `award`, the `Session` class (tally, status, result and `explain`), and the guards `isAnswer`, `isChoice` and `isSettings`
- `saved/`: `loadSavedGame` and `loadSettings`, which reject a bad save with its own message
- `outline/`: `outline` (one line per question with its number, text and kind) and `countKinds` (how many questions of each kind)

In `apps/cli/src`:

- `saved.ts`: a saved game (the answers and a start time) and saved settings (a name and whether to show hints)
- `index.ts`: loads the settings and greets the player, prints the outline and the count of each kind, plays the saved game, prints the result and the reasons, and shows what happens with broken saves

The shared settings live in `internal/tooling`: a TypeScript base config, a Prettier config, and an ESLint config that takes the directory of the package being linted.

## Current Stage

The CLI loads the settings, greets the player, and prints an outline of the quiz. It then plays a saved game, picks the survivor with the most points, and prints the result with the reasons for it. At the end it tries three broken saves to show that each kind of failure has its own error message.

Example output:

```text
Hello, Survivor

## Outline

1. A stranger with a knife starts chasing you down a dark street. What do you do? (choice, 4 options)
2. How likely are you to bolt the moment you sense danger? (scale)
3. Would you go down to the basement to check a strange noise? (yes or no)

Kinds: choice 1, scale 1, yesno 1

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
pnpm --filter @platform/cli start play          # You can answer the quiz by prompt
pnpm --filter @platform/cli start play -n Bo    # You can greet someone by name
pnpm --filter @platform/cli start replay        # You can replay the saved answers
pnpm --filter @platform/cli start --help        # You can list the commands
```

## Checks

| Command         | What it does                                                          |
| --------------- | --------------------------------------------------------------------- |
| `pnpm lint`     | Runs every check in every package through Nx, `tooling` first         |
| `pnpm -r format`| Formats every package with Prettier                                   |
| `pnpm nx graph` | Shows how the packages depend on each other                           |

`pnpm lint` runs four checks in each package: TypeScript (`tsc --noEmit`), ESLint, Prettier and knip. Knip runs from the workspace root (`--directory ../..`) so that it can read the catalog in `pnpm-workspace.yaml`.