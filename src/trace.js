import fs from "node:fs/promises";

export async function appendTrace(path, event) {
  await fs.appendFile(path, `${JSON.stringify({ ...event, recordedAt: event.recordedAt ?? new Date().toISOString() })}\n`, "utf8");
}

export async function readTrace(path) {
  const text = await fs.readFile(path, "utf8");
  const events = [];
  const errors = [];
  text.split(/\r?\n/).forEach((line, index) => {
    if (!line.trim()) return;
    try { events.push(JSON.parse(line)); } catch (error) { errors.push({ line: index + 1, message: error.message }); }
  });
  return { events, errors };
}

export function replayTrace(events) {
  return events.map((event, index) => ({ index: index + 1, tool: event.tool ?? "<missing>", arguments: event.arguments ?? {}, result: event.result ?? null, status: event.tool && event.result !== undefined ? "ready" : "incomplete" }));
}
