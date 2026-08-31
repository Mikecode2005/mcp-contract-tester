# Architecture

The project is intentionally split into three small layers:

1. contract.js turns a tools/list-shaped value into deterministic findings.
2. trace.js treats JSONL as an append-friendly local interchange format.
3. report.js renders findings without a server or runtime dependency.

The CLI is a thin adapter around these modules. This keeps validation usable from tests and future GitHub Actions without spawning a process. The browser landing page is presentation only; it never receives contract data.
