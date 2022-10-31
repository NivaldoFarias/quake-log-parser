<!-- Project Summary -->

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/quake-log-parser/tree/main/server">
    <img src="assets/img/quake-logo.png" alt="Logo" width="100">
  </a>

  <h3 align="center">Quake Log Parser PoC</h3>
  <div align="center">
    TypeScript Log Parser for Quake 3 Arena Log Files
    <br />
    <a href="https://github.com/NivaldoFarias/quake-log-parser/tree/main/server"><strong>Browse code»</strong></a>
    -
    <a href="https://github.com/NivaldoFarias/quake-log-parser/tree/main/client"><strong>Run parser locally»</strong></a>
  </div>
</div>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-%23A8D1FF?style=flat-square" />
</div>

<!-- Table of Contents -->

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Tasks](#tasks)
  - [Log Parser](#log-parser)
  - [Report and Bonus](#report-and-bonus)
- [Results](#results)
- [Installation and Usage](#installation-and-usage)
          - [Pre-requisites: Node.js `^18.12.0` (LTS)](#pre-requisites-nodejs-18120-lts)

<!-- Task and Goals -->

# Tasks

## Log Parser

The first given task was to create a project to parse the provided Quake 3 Arena log file, these were the requirements for implementation:

- [x] Read the log file
- [x] Group the Game data of each match
- [x] Collect kill data
- Additional notes:
  - [x] When `<world>` kills a player, the player loses **1** kill score.
  - [x] Since `<world>` is not a player, it should not be listed in the dictionary of players or kills.
  - [x] The counter `total_kills` includes players and `<world>` kills.

## Report and Bonus

The second given task was to create a script that prints a report of the parsed data, there were no requirements for implementation.

As for the Bonus, the task was to include the death causes **(means of death)** for each match in the report, grouping them by the following categories that were extracted from [source code](https://github.com/id-Software/Quake-III-Arena/blob/master/code/game/bg_public.h):

```c
// means of death
typedef enum {
  MOD_UNKNOWN,
  MOD_SHOTGUN,
  MOD_GAUNTLET,
  MOD_MACHINEGUN,
  MOD_GRENADE,
  MOD_GRENADE_SPLASH,
  MOD_ROCKET,
  MOD_ROCKET_SPLASH,
  MOD_PLASMA,
  MOD_PLASMA_SPLASH,
  MOD_RAILGUN,
  MOD_LIGHTNING,
  MOD_BFG,
  MOD_BFG_SPLASH,
  MOD_WATER,
  MOD_SLIME,
  MOD_LAVA,
  MOD_CRUSH,
  MOD_TELEFRAG,
  MOD_FALLING,
  MOD_SUICIDE,
  MOD_TARGET_LASER,
  MOD_TRIGGER_HURT,
#ifdef MISSIONPACK
  MOD_NAIL,
  MOD_CHAINGUN,
  MOD_PROXIMITY_MINE,
  MOD_KAMIKAZE,
  MOD_JUICED,
#endif
  MOD_GRAPPLE
} meansOfDeath_t;

```

<!-- Results -->

# Results

The Architecture and Development decisions were made with two essential aspects in mind:

- **Code Readabily/Open Source**: maintain the Development Experience fluent and intuitive for any Developer that chooses to study or use the Code as basis or template in the future.
- **DRY/SOLID principles**: Write a reusable, flexible and design-focused code. Inherit instruction decisions that intends to lessen the complexity of ambiguous, over-arching codes.

The following snippet is taken from the script's output `JSON` file:

```json
{
  "games": [
    ...,
    {
      "id": 2,
      "total_kills": 11,
      "players": {
        "Isgalamido": {
          "kills": 0,
          "deaths": 10
        },
        "Dono da Bola": {
          "kills": 0,
          "deaths": 0
        },
        "Mocinha": {
          "kills": 0,
          "deaths": 1
        }
      },
      "items": {
        "weapon_rocketlauncher": 20,
        "ammo_rockets": 11,
        "item_armor_body": 6,
        "ammo_shells": 2,
        "item_health_large": 5,
        "item_quad": 1,
        "item_armor_shard": 11,
        "item_armor_combat": 3,
        "weapon_shotgun": 1,
        "item_health_mega": 1
      },
      "kills_by_means": {
        "MOD_TRIGGER_HURT": 7,
        "MOD_ROCKET_SPLASH": 3,
        "MOD_FALLING": 1
      },
      "elapsed_time": "5:31"
    },
    ...
  ]
}
```

<!-- Installation and Usage -->

# Installation and Usage

###### Pre-requisites: Node.js `^18.12.0` (LTS)

Download the zip file and extract it in the root of a new project folder by running these commands:

```bash
wget https://github.com/NivaldoFarias/quake-log-parser/archive/main.zip
```

Then run the following command to install the project's dependencies:

```bash
npm install
```

That's it! You can run the scripts locally to create a new report file by running:

```bash
npm run report
```
