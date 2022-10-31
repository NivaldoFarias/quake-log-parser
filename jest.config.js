/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 90,
      branches: 80,
      functions: 90,
      statements: 90,
    },
    "./src/scripts/*.{ts,tsx}": {
      lines: 100,
      branches: 60,
      functions: 100,
      statements: 100,
    },
    "./tests/mocks/*.{ts,tsx}": {
      branches: 50,
    },
  },
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        esModuleInterop: true,
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["dotenv/config"],
};
