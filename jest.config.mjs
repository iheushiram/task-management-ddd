// jest.config.mjs  ← 拡張子は .mjs 推奨（"type":"module" のため）
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },

  // ← transform の外（トップレベル）
  moduleNameMapper: {
    // ESM import で './x.js' と書かれていても .ts に解決できるようにする
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  roots: ["<rootDir>/src"],

  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts", "!**/node_modules/**"],
  coverageDirectory: "coverage_dir",
  coverageReporters: ["html"],
}
