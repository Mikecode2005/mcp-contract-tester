import test from "node:test";
import assert from "node:assert/strict";
import { validateContract } from "../src/contract.js";
const valid = { tools: [{ name: "search_documents", description: "Search the indexed document collection.", inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } }] };
test("accepts a valid tools/list response", () => { const report = validateContract(valid); assert.equal(report.ok, true); assert.equal(report.toolCount, 1); assert.equal(report.errors, 0); });
test("rejects duplicate names and missing required properties", () => { const report = validateContract({ tools: [{ name: "search", description: "Search things safely.", inputSchema: { type: "object", properties: {} } }, { name: "search", description: "Search things safely.", inputSchema: { type: "object", required: ["query"] } }] }); assert.equal(report.ok, false); assert.ok(report.findings.some((item) => item.code === "tool.name.duplicate")); assert.ok(report.findings.some((item) => item.code === "schema.required-property")); });
test("accepts a bare tools array", () => { const report = validateContract(valid.tools); assert.equal(report.ok, true); });
test("warns on a very short description", () => { const report = validateContract({ tools: [{ name: "ping", description: "Ping.", inputSchema: { type: "object" } }] }); assert.equal(report.ok, true); assert.equal(report.warnings, 1); });
