#!/usr/bin/env sh
set -eu
node ./bin/mcp-contract-tester.js validate examples/valid-tools.json
node ./bin/mcp-contract-tester.js report examples/valid-tools.json --out contract.report.html
