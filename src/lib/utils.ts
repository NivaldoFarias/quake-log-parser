import type SystemError from "./SystemError";
import { readFile } from "node:fs/promises";

export function timeToMinutes(time: string) {
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export function minutesToString(time: number) {
  return Math.trunc(time / 60) + ":" + ("00" + (time % 60)).slice(-2);
}

export async function logToString() {
  try {
    const logFile = await readFile("./log/test.log", {
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
