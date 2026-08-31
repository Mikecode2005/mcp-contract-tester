# Future stdio discovery

Direct MCP discovery is intentionally not part of version 0.1. A future adapter should launch a configured process, negotiate capabilities, request tools/list, capture stderr separately, and enforce a timeout. It must never execute arbitrary commands from an untrusted contract file.

The adapter should feed the same validator used by the JSON fixture path so findings remain comparable between offline and transport-backed checks.
