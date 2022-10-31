import type { Game, Report } from "./lib/types";

import { logToString, createJSON } from "./helpers";
import * as util from "./lib/utils";
import regex from "./lib/regex";

createLogReport();

async function createLogReport() {
  const output: Report = {
    games: [],
  };
  const unfilteredLog = await logToString("./assets/log/quake.log");

  // create array of logs per each game
  const iterableGameRegex = unfilteredLog.matchAll(regex.games);

  const notIterable = typeof iterableGameRegex[Symbol.iterator] !== "function";
  if (notIterable) {
    throw new Error("No games found");
  }

  for (const gameRegex of iterableGameRegex) {
    const game = gameRegex.groups?.game ?? "";
    output.games.push(buildGameReport(game.trim(), output.games.length));
  }

  await createJSON(output, "./json/report.json");

  return console.log(
    `[INFO] Parsed ${output.games.length} games from Log file successfully`,
  );
}

function buildGameReport(log: string, index: number): Game {
  const game: Game = {
    id: index,
    ...buildGameInfo(),
  };

  return game;

  function buildGameInfo() {
    const output = {
      total_kills: 0,
      players: new Map<string, Record<"kills" | "deaths", number>>(),

      items: new Map<string, number>(),
      kills_by_means: new Map<string, number>(),
      elapsed_time: "",
    };

    playersInfo();
    killsInfo();
    itemsInfo();
    elapsedTime();

    return {
      ...output,
      players: { ...Object.fromEntries(output.players) },
      items: { ...Object.fromEntries(output.items) },
      kills_by_means: { ...Object.fromEntries(output.kills_by_means) },
    };

    function playersInfo() {
      const iterablePlayersRegex = log.matchAll(regex.players);

      for (const playerRegex of iterablePlayersRegex) {
        if (!Object.hasOwn(playerRegex, "groups")) {
          throw new Error("No players found");
        }

        const player = playerRegex.groups?.player ?? "";
        output.players.set(player, {
          kills: 0,
          deaths: 0,
        });
      }
    }

    function killsInfo() {
      const iterableKillsRegex = log.matchAll(regex.kills);

      for (const killRegex of iterableKillsRegex) {
        if (!Object.hasOwn(killRegex, "groups")) {
          throw new Error("No kills found");
        }

        const killedBy = killRegex.groups?.killed_by ?? "";
        const player = killRegex.groups?.player ?? "";
        const meansOfDeath = killRegex.groups?.means_of_death ?? "";

        output.players.set(player, {
          kills: output.players.get(player)?.kills ?? 0,
          deaths: (output.players.get(player)?.deaths ?? 0) + 1,
        });

        if (killedBy === "<world>" || killedBy === player) {
          if (
            // @ts-expect-error
            output.players.get(player)?.kills > 0
          ) {
            const onlySubtractIfAboveZero =
              (output.players.get(killedBy)?.kills ?? 0) - 1 === -1
                ? 0
                : (output.players.get(killedBy)?.kills ?? 0) - 1;

            output.players.set(player, {
              kills: onlySubtractIfAboveZero,
              deaths: output.players.get(killedBy)?.deaths ?? 0,
            });
          }
        } else {
          output.players.set(killedBy, {
            kills: (output.players.get(killedBy)?.kills ?? 0) + 1,
            deaths: output.players.get(killedBy)?.deaths ?? 0,
          });
        }

        output.kills_by_means.set(
          meansOfDeath,
          (output.kills_by_means.get(meansOfDeath) ?? 0) + 1,
        );

        output.total_kills++;
      }
    }

    function itemsInfo() {
      const iterableItemsRegex = log.matchAll(regex.items);

      for (const itemRegex of iterableItemsRegex) {
        if (!Object.hasOwn(itemRegex, "groups")) {
          throw new Error("No items found");
        }

        const item = itemRegex.groups?.item ?? "";

        output.items.set(item, (output.items.get(item) ?? 0) + 1);
      }
    }

    function elapsedTime() {
      const elapsedTimeRegex = log.matchAll(regex.elapsed_time);

      for (const timeRegex of elapsedTimeRegex) {
        if (!Object.hasOwn(timeRegex, "groups")) {
          throw new Error("No time found");
        }

        const { start, end } = timeRegex.groups as unknown as {
          start: string;
          end: string;
        };

        const elapsedTime = util.minutesToString(
          util.timeToMinutes(end) - util.timeToMinutes(start),
        );

        output.elapsed_time = util.normalizeTimeString(elapsedTime);
      }
    }
  }
}
