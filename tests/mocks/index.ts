import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

const GAME_NULL = {
  id: 0,
  total_kills: 0,
  players: {},
  kills_by_means: {},
  items: {},
  elapsed_time: "0:00",
};

const GAME_OBJECT = (id: number, elapsed_time: string) => {
  return {
    id,
    elapsed_time,
    items: {
      ammo_rockets: 11,
      ammo_shells: 2,
      item_armor_body: 6,
      item_armor_combat: 3,
      item_armor_shard: 11,
      item_health_large: 5,
      item_health_mega: 1,
      item_quad: 1,
      weapon_rocketlauncher: 20,
      weapon_shotgun: 1,
    },
    kills_by_means: {
      MOD_FALLING: 1,
      MOD_ROCKET_SPLASH: 3,
      MOD_TRIGGER_HURT: 7,
    },
    players: {
      "Dono da Bola": {
        deaths: 0,
        kills: 0,
      },
      Isgalamido: {
        deaths: 10,
        kills: 0,
      },
      Mocinha: {
        deaths: 1,
        kills: 0,
      },
    },
    total_kills: 11,
  };
};

export default {
  LOG_PATH: process.env.LOG_PATH ?? "./tests/log/test.log",
  OUTPUT_PATH: process.env.OUTPUT_PATH ?? "./tests/json/report.test.json",
  INVALID_LOG: process.env.INVALID_LOG ?? "./tests/log/invalid.log",
  GAME_NULL,
  GAME_OBJECT: GAME_OBJECT(0, "0:00"),
  REPORT: {
    games: [
      {
        id: 0,
        total_kills: 0,
        players: {
          Isgalamido: {
            deaths: 0,
            kills: 0,
          },
        },
        kills_by_means: {},
        items: {},
        elapsed_time: "5:37",
      },
      GAME_OBJECT(1, "5:31"),
    ],
  },
};
