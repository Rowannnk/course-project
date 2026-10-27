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

## What I Built

- `types.ts`: an `OutcomeId` union, an `Outcome` with an id, a `Question` union of three kinds (choice, scale, yes/no) that point at an outcome, and an `Answer` union to match
- `data.ts`: the four survivor outcomes and the survival questions
- `quiz.ts`: `show` prints a question and `recap` writes one sentence about an answer
- `session.ts`: a `Session` class that keeps a tally per outcome, moves from waiting to asking to done, picks the result, and keeps the reasons behind each outcome so `explain` can say why you got your result
- `index.ts`: runs the quiz with hard-coded answers and prints the result and the reasons

## Current Stage

The quiz shows every question, records the hard-coded answers in a session, and picks the survivor with the most points. It then prints a result card and the reasons for it.

Example output:

```text
You are: The Sprinter
Smart and fast. You never wait to find out what happens.

You got this because:
- A stranger with a knife starts chasing you down a dark street. What do you do? You chose Run as fast as I can.
- How likely are you to bolt the moment you sense danger? You rated it 4 out of 5.
```

## Getting Started

```bash
npm install
npm start
```

## Tooling

| Tool       | Command             | Purpose                             |
| ---------- | ------------------- | ----------------------------------- |
| TypeScript | `npm run typecheck` | Checks types without emitting files |
| ESLint     | `npm run lint`      | Finds code problems                 |
| Prettier   | `npm run format`    | Formats code consistently           |
| Run        | `npm start`         | Runs `src/index.ts`                 |
