#!/usr/bin/env node
import fs from "node:fs/promises";
import { validateContract } from "../src/contract.js";
import { appendTrace, readTrace, replayTrace } from "../src/trace.js";
import { renderReport } from "../src/report.js";

const args = process.argv.slice(2);
const command = args[0];
function value(flag, fallback) { const index = args.indexOf(flag); return index === -1 ? fallback : args[index + 1]; }
function usage() { console.log(`mcp-contract-tester 0.1.0\n\nCommands:\n  validate <file> [--json] [--report <file>]  Validate an MCP tools document\n  report <file> --out <file>                 Write an HTML validation report\n  record <trace> --tool <name> [options]     Append one JSONL tool-call event\n  replay <trace> [--json]                    Inspect recorded tool-call events\n\nExamples:\n  mcp-contract-tester validate examples/valid-tools.json\n  mcp-contract-tester report examples/valid-tools.json --out report.html\n  mcp-contract-tester record trace.jsonl --tool search --arguments '{"q":"MCP"}' --result '{"items":[]}'\n  mcp-contract-tester replay trace.jsonl`); }
async function readJson(path) { try { return JSON.parse(await fs.readFile(path, "utf8")); } catch (error) { throw new Error(`Could not read JSON from ${path}: ${error.message}`); } }
function printResult(result, json) { if (json) console.log(JSON.stringify(result, null, 2)); else { console.log(`${result.ok ? "PASS" : "FAIL"} · ${result.toolCount} tools · ${result.errors} errors · ${result.warnings} warnings`); for (const finding of result.findings) console.log(`  ${finding.severity.toUpperCase()} ${finding.code}: ${finding.message}`); } }
async function main() {
  if (!command || command === "help" || command === "--help" || command === "-h") return usage();
  if (command === "validate" || command === "report") { const file = args[1]; if (!file) throw new Error("A contract JSON file is required."); const result = validateContract(await readJson(file)); if (command === "report" || value("--report")) { const output = value("--out", value("--report")); if (!output) throw new Error("Use --out or --report to choose an HTML report path."); await fs.writeFile(output, renderReport(result, `Validation report · ${file}`), "utf8"); console.log(`Wrote ${output}`); } else printResult(result, args.includes("--json")); process.exitCode = result.ok ? 0 : 1; return; }
  if (command === "record") { const trace = args[1]; const tool = value("--tool"); if (!trace || !tool) throw new Error("record requires a trace path and --tool."); const parse = (flag, fallback) => { const raw = value(flag); return raw === undefined ? fallback : JSON.parse(raw); }; await appendTrace(trace, { tool, arguments: parse("--arguments", {}), result: parse("--result", null), metadata: parse("--metadata", {}) }); console.log(`Recorded ${tool} in ${trace}`); return; }
  if (command === "replay") { const trace = args[1]; if (!trace) throw new Error("A trace JSONL file is required."); const loaded = await readTrace(trace); const output = { ...loaded, events: replayTrace(loaded.events) }; if (args.includes("--json")) console.log(JSON.stringify(output, null, 2)); else { console.log(`${output.events.length} recorded event(s)`); output.events.forEach((event) => console.log(`  ${event.index}. ${event.tool} · ${event.status}`)); output.errors.forEach((error) => console.log(`  ERROR line ${error.line}: ${error.message}`)); } process.exitCode = output.errors.length ? 1 : 0; return; }
  throw new Error(`Unknown command: ${command}`);
}
main().catch((error) => { console.error(`Error: ${error.message}`); process.exitCode = 1; });
