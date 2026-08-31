import test from 'node:test';
import assert from 'node:assert/strict';
import { renderReport } from '../src/report.js';

test('renders a passing report with escaped content', () => {
  const html = renderReport({ ok: true, toolCount: 1, errors: 0, warnings: 0, findings: [] }, 'A <safe> report');
  assert.match(html, /A &lt;safe&gt; report/);
  assert.match(html, /PASS/);
  assert.match(html, /No findings/);
});

test('renders finding severity and message', () => {
  const html = renderReport({ ok: false, toolCount: 1, errors: 1, warnings: 0, findings: [{ severity: 'error', code: 'demo', path: '[0]', message: 'Bad <value>' }] });
  assert.match(html, /class="badge error"/);
  assert.match(html, /Bad &lt;value&gt;/);
});
