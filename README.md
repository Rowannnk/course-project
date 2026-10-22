# 🔪 Would You Survive the Chase?

A horror-survival personality quiz built with TypeScript for the **Advanced JavaScript and TypeScript** course.

## About the Quiz

Each question puts you in a scary situation, like being chased in the dark or hearing footsteps behind you, and asks what you would do. There are no right answers, it's just for fun.

Every choice is worth points, and your points decide which survivor you are:

| Survivor     | Style                         |
| ------------ | ----------------------------- |
| The Believer | Prays and hopes for the best  |
| The Hider    | Disappears quietly            |
| The Sprinter | Runs without thinking         |
| The Fighter  | Turns around and swings first |

## Current Stage

The project is at the first stage: a single typed program that picks a result from answers it already has. It prints the question, the choice that was picked with its points, and a result card for the matching survivor.

Example output:

```text
You chose Run as fast as I can (2 points)
The Sprinter
Smart and fast. You never wait to find out what happens.
```

## Roadmap

As the course goes on, the quiz will grow in stages:

1. A single typed program (current)
2. A monorepo so the parts can share code
3. A command-line program that reads questions from files
4. A backend that provides the quiz data and evaluates answers, with a command-line client
5. A browser client for the same backend

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
