import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { appendTrace, readTrace, replayTrace } from '../src/trace.js';

test('round trips JSONL events and marks ready calls', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'mcp-trace-'));
  const path = join(directory, 'trace.jsonl');
  await appendTrace(path, { tool: 'search', arguments: { q: 'test' }, result: { items: [] }, recordedAt: '2026-01-01T00:00:00.000Z' });
  const loaded = await readTrace(path);
  assert.equal(loaded.errors.length, 0);
  assert.equal(replayTrace(loaded.events)[0].status, 'ready');
  assert.match(await readFile(path, 'utf8'), /search/);
  await rm(directory, { recursive: true, force: true });
});

test('reports malformed JSONL lines without hiding valid events', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'mcp-trace-'));
  const path = join(directory, 'broken.jsonl');
  await import('node:fs/promises').then(({ writeFile }) => writeFile(path, '{"tool":"ok"}\nnot-json\n'));
  const loaded = await readTrace(path);
  assert.equal(loaded.events.length, 1);
  assert.equal(loaded.errors.length, 1);
  await rm(directory, { recursive: true, force: true });
});
