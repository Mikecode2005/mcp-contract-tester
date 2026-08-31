# mcp-contract-tester

> Validate, record, and replay Model Context Protocol tool contracts before they reach production.

[![CI](https://github.com/Mikecode2005/mcp-contract-tester/actions/workflows/ci.yml/badge.svg)](https://github.com/Mikecode2005/mcp-contract-tester/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-2f6f4e?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

MCP servers expose tools to AI clients. A malformed name, missing description, or inconsistent JSON Schema can create confusing failures far away from the server that caused them. **mcp-contract-tester** is a local, dependency-free CLI that catches these contract problems early and turns validation results into shareable HTML reports.

## Why this exists

Most MCP development feedback currently happens at runtime: connect a client, call a tool, inspect an error, repeat. This project moves a small but important part of that feedback into CI and local development. It focuses on deterministic contract checks first, with transport-aware discovery and richer replay planned for later releases.

## Current features

- Validate a `tools/list`-style JSON document or a bare tools array.
- Catch missing names, invalid name characters, duplicate names, missing descriptions, malformed schemas, and invalid required properties.
- Warn when a description is too short to be useful to an AI client.
- Generate a standalone HTML report with no hosted service.
- Record and inspect JSONL tool-call traces without sending them anywhere.
- Run on Node.js 20+ with no runtime dependencies.

## Quick start

```bash
npm install
npm test

node ./bin/mcp-contract-tester.js validate examples/valid-tools.json
node ./bin/mcp-contract-tester.js report examples/valid-tools.json --out contract.report.html

node ./bin/mcp-contract-tester.js record /tmp/mcp-trace.jsonl --tool search_documents --arguments '{"query":"MCP","limit":5}' --result '{"items":[]}'
node ./bin/mcp-contract-tester.js replay /tmp/mcp-trace.jsonl
```

## CLI commands

| Command | Purpose |
| --- | --- |
| `validate <file>` | Validate a JSON contract and print findings. Add `--json` for machine-readable output. |
| `report <file> --out <file>` | Write a standalone HTML report. |
| `record <trace> --tool <name>` | Append a JSONL event. |
| `replay <trace>` | Inspect recorded events. |

## Roadmap

- [ ] Discover tools directly from an MCP server over stdio.
- [ ] Add JSON Schema compatibility checks for tool arguments.
- [ ] Add snapshot comparison between server versions.
- [ ] Add a GitHub Action with PR annotations.
- [ ] Add deterministic request replay against a test adapter.
- [ ] Add latency and error summaries to trace reports.

## Safety and privacy

The CLI runs locally and does not upload contracts or traces. Do not commit real secrets, private prompts, or production traces. Replay is currently inspection-only and does not execute remote tools. Read [SECURITY.md](SECURITY.md) for limitations.

## Contributing

Issues and pull requests are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), run the test suite, and include a regression fixture for new validation rules.

## License

MIT © Michael
