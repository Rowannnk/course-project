import { program } from "commander"

import play from "./commands/play/index.ts"
import replay from "./commands/replay/index.ts"

program.name("quiz").description("Take a quiz in the terminal")

program
  .command("play")
  .description("Answer a quiz at the terminal")
  .argument("[quiz]", "the quiz to play", "survival")
  .option("-n, --name <name>", "your name")
  .action(play)

program
  .command("replay")
  .description("Play a quiz again with the answers saved in game.json")
  .argument("[quiz]", "the quiz to replay", "survival")
  .action(replay)

try {
  await program.parseAsync()
} catch (error) {
  if (error instanceof Error && error.name === "ExitPromptError") {
    process.exitCode = 130
  } else {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
