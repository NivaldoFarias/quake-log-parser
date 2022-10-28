import type SystemError from "./lib/SystemError";
import { readFile } from "node:fs/promises";
import regex from "./lib/regex";

init();

async function init() {
  const unfilteredLog = await logToString();
  const games = unfilteredLog.matchAll(regex.games);

  if (!games) throw new Error("No games found");

  for (const game of games) {
    console.log(typeof game.groups?.game ?? "Game was not found");
  }
}

async function logToString() {
  try {
    const logFile = await readFile("./src/log/test.log", {
      encoding: "utf8",
    });
    return logFile;
  } catch (error: unknown) {
    const isSystemError =
      Object.hasOwn(error as Object, "code") &&
      Object.hasOwn(error as Object, "message");

    if (isSystemError) {
      throw new Error((error as SystemError).message);
    }

    console.error(error);
    throw new Error("An unknown error has occurred");
  }
}
