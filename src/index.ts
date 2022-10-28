import { readFile } from "node:fs/promises";
import SystemError from "./lib/SystemError";

init();

async function init() {
  await logToString();
}

async function logToString() {
  try {
    const logFile = await readFile("./src/log/quake.log", {
      encoding: "utf8",
    });
    return logFile;
  } catch (error: unknown) {
    if (error instanceof SystemError) {
      return console.error(error.message);
    }

    return console.error(error);
  }
}
