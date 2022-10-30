import * as util from "./lib/utils";
import regex from "./lib/regex";

init();

async function init() {
  const output: Record<string, unknown>[] = [];
  const unfilteredLog = await util.logToString("./log/quake.log");

  // create array of logs per each game
  const iterableGameRegex = unfilteredLog.matchAll(regex.games);

  const notIterable = typeof iterableGameRegex[Symbol.iterator] !== "function";
  if (notIterable) {
    throw new Error("No games found");
  }

  for (const gameRegex of iterableGameRegex) {
    const game = gameRegex.groups?.game ?? "";
    output.push(buildGameReport(game.trim(), output.length));
  }

  return console.log(output);
}

function buildGameReport(log: string, index: number): Record<string, unknown> {
  const game: { [key: string]: any } = {
    id: index,
    ...buildGameInfo(),
  };

  return game;

  function buildGameInfo() {
    const output = {
      total_kills: 0,
      players: new Set<string>(),
      kills: new Map<string, number>(),
      deaths: new Map<string, number>(),
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
      players: [...output.players],
      kills: { ...Object.fromEntries(output.kills) },
      deaths: { ...Object.fromEntries(output.deaths) },
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
        output.players.add(player);
        output.kills.set(player, 0);
        output.deaths.set(player, 0);
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

        output.deaths.set(player, (output.deaths.get(player) || 0) + 1);
        if (killedBy === "<world>" || killedBy === player) {
          // @ts-expect-error
          if (output.kills.has(player) && output.kills.get(player) > 0) {
            // @ts-expect-error
            output.kills.set(player, output.kills.get(player) - 1);
          }
        } else
          output.kills.set(killedBy, (output.kills.get(killedBy) || 0) + 1);

        output.kills_by_means.set(
          meansOfDeath,
          (output.kills_by_means.get(meansOfDeath) || 0) + 1,
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

        output.items.set(item, (output.items.get(item) || 0) + 1);
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
