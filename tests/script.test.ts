import { describe, expect, test } from "@jest/globals";
import { readFile } from "fs/promises";

import { buildGameReport, createLogReport } from "./../src/scripts";
import { logToString, createJSON } from "./../src/helpers";
import * as util from "../src/lib/utils";

import mock from "./../mocks";

describe("Log Report", () => {
  test("should create a report", async () => {
    const report = await createLogReport(mock.LOG_PATH, mock.OUTPUT_PATH);

    try {
      const reportJSON = await readFile(mock.OUTPUT_PATH, "utf-8");
      const reportObject = JSON.parse(reportJSON);

      expect(report).toBe(undefined);
      expect(reportObject).toEqual(mock.REPORT);
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  test("should create a game Object", async () => {
    const log = await logToString(mock.LOG_PATH);
    const game = buildGameReport(log, 0);

    expect(game).toStrictEqual(mock.GAME_OBJECT);
  });

  test("should create a JSON file", async () => {
    const report = await createJSON(mock.REPORT, mock.OUTPUT_PATH);

    try {
      const reportJSON = await readFile(mock.OUTPUT_PATH, "utf-8");
      const jsonOutput = JSON.parse(reportJSON);

      expect(report).toBe(undefined);
      expect(jsonOutput).toHaveProperty("games");
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});

describe("Error Handling", () => {
  test("Should throw error if no games found", async () => {
    try {
      const invalidLog = await createLogReport(mock.INVALID_LOG, "");
      expect(invalidLog).toBe(undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "No games found");
    }
  });

  test("should throw error if the log file does not exist", async () => {
    try {
      const log = await logToString("./assets/log/invalid.log");
      expect(log).toBeNull();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        "[ERROR] ENOENT: no such file or directory, open './assets/log/invalid.log'",
      );
    }
  });

  test("should throw error if the output file does not exist", async () => {
    const report = { games: [mock.GAME_NULL] };
    const invalidPath = "./invalid/invalid.json";

    try {
      const json = await createJSON(report, invalidPath);
      expect(json).toBe(undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        `[ERROR] ENOENT: no such file or directory, open '${invalidPath}'`,
      );
    }
  });
});

describe("Utils", () => {
  test("should convert time to minutes", () => {
    const time = "00:00";
    const minutes = 0;

    expect(util.timeToMinutes(time)).toBe(minutes);
  });

  test("should convert minutes to time", () => {
    const minutes = 0;
    const time = "0:00";

    expect(util.minutesToString(minutes)).toBe(time);
  });

  test("should normalize time", () => {
    const time = "000:00";
    const normalizedTime = "0:00";

    expect(util.normalizeTimeString(time)).toBe(normalizedTime);
  });
});
