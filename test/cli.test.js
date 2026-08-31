import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
const run = promisify(execFile);
const cli = fileURLToPath(new URL('../bin/mcp-contract-tester.js', import.meta.url));

test('prints help for the help command', async () => {
  const result = await run(process.execPath, [cli, 'help']);
  assert.match(result.stdout, /validate <file>/);
  assert.match(result.stdout, /replay <trace>/);
});

test('validates the checked-in example', async () => {
  const file = fileURLToPath(new URL('../examples/valid-tools.json', import.meta.url));
  const result = await run(process.execPath, [cli, 'validate', file]);
  assert.match(result.stdout, /PASS/);
});
