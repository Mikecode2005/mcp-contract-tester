import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContract } from './contract.js';

test('rejects a non-object contract', () => {
  const report = validateContract(null);
  assert.equal(report.ok, false);
  assert.equal(report.findings[0].code, 'tools.invalid');
});

test('warns instead of failing for an empty tools array', () => {
  const report = validateContract({ tools: [] });
  assert.equal(report.ok, true);
  assert.equal(report.warnings, 1);
});

test('allows dots, underscores, and hyphens in tool names', () => {
  const report = validateContract({ tools: [
    { name: 'docs.search-v2', description: 'Search indexed docs safely.', inputSchema: { type: 'object' } },
    { name: 'cache_clear_all', description: 'Clear the local cache.', inputSchema: { type: 'object' } }
  ] });
  assert.equal(report.ok, true);
});
