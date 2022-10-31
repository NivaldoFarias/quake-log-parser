import type SystemError from "./../lib/SystemError";
import type { Report } from "./../lib/types";

import { readFile, writeFile } from "node:fs/promises";

export async function logToString(path: string) {
  try {
    const logFile = await readFile(path, {
      encoding: "utf8",
    });
    return logFile;
  } catch (error: unknown) {
    throw new Error("[ERROR] " + (error as SystemError).message);
  }
}

export async function createJSON(data: Report, path: string) {
  const json = JSON.stringify(data, null, 4);

  try {
    await writeFile(path, json, {
      encoding: "utf8",
    });
  } catch (error: unknown) {
    throw new Error("[ERROR] " + (error as SystemError).message);
  }

  return console.log("[INFO] JSON file created at '" + path + "'");
}
