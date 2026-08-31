import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

rmSync("build", { recursive: true, force: true });
mkdirSync("build/client", { recursive: true });
mkdirSync("build/server", { recursive: true });
cpSync("public", "build/client", { recursive: true });
cpSync("worker.js", "build/server/worker.js");
const rawConfig = readFileSync("wrangler.jsonc", "utf8");
const config = JSON.parse(rawConfig.replace(/\/\/[^\n]*/g, "").replace(/,(\s*[}\]])/g, "$1"));
const manifest = { main: "worker.js", no_bundle: true, rules: [{ type: "ESModule", globs: ["**/*.js", "**/*.mjs"] }], compatibility_date: config.compatibility_date, compatibility_flags: config.compatibility_flags ?? [], assets: { directory: "../client", binding: "ASSETS" }, ...(config.vars ? { vars: config.vars } : {}) };
writeFileSync("build/server/wrangler.json", JSON.stringify(manifest, null, 2) + "\n");
