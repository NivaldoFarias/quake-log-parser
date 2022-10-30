import type SystemError from "./../lib/SystemError";
import { readFile, writeFile } from "node:fs/promises";

export async function logToString(path: string) {
  try {
    const logFile = await readFile(path, {
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

export async function createJSON(
  data: Record<string, unknown>[],
  path: string,
) {
  const json = JSON.stringify(data, null, 4);

  try {
    await writeFile(path, json, {
      encoding: "utf8",
    });
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

  return console.log("JSON file created");
}
